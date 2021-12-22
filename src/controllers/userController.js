import userInfos from "../models/user"
import bcrypt from "bcrypt"
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book"
class UserController {
    //  create user in db

    static async createUser(req, res) {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await userInfos.create(req.body);

        if (!user) {
            return res.status(404).json({ error: "user not registered" })
        }


        return res
            .status(200)
            .json({ message: "user created successfully", data: user });
    }


    // get all users
    static async getAllUsers(req, res) {
        const users = await userInfos.find();

        if (!users) {
            return res.status(404).json({ error: "user not registered" })
        }


        return res
            .status(200)
            .json({ message: " Successfully retrieved users", data: users });
    }
    static async getOneUser(req, res) {
        const user = await userInfos.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        return res
            .status(200)
            .json({ message: "user not found successfully", data: user })
    }
    //delete a user
    static async deleteOneUser(req, res) {
        const user = await userInfos.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        return res
            .status(200)
            .json({ message: "user deleted successfully", data: user })
    }

    // login function

    static async userLogin(req, res) {
        const user = await userInfos.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ error: "user not found kindly register first" })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            user.password = null;
            const token = TokenAuth.tokenGenerator({ user: user });
            return res.status(200).json({ message: "successfully logged in", token: token });
        }
        return res.status(400).json({ error: "password is wrong" });
    }
    // BOOKING functions

    static async bookTour(req, res) {
        const bookData = {
            user: req.user._id,
            tour: req.params.id
        }
        const book = await BookInfos.create(bookData);
        if (!book) {
            return res.status(404).json({ error: "failed to book" });

        }
        return res.status(200).json({ message: "Booked successfully", data: book })
    }
    // all tours
    static async getAllBookings(req, res) {
        const bookData = {
            user: req.user._id,
            tour: req.params.id
        }
        const book = await BookInfos.find();
        if (!book) {
            return res.status(404).json({ error: "failed to see all books" });

        }
        return res.status(200).json({ message: "Bookes retrived successfully", data: book })
    }
    // specific tour

    static async getOneBooking(req, res) {
        const bookData = {
            user: req.user._id,
            tour: req.params.id
        }
    const book = await BookInfos.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "failed to see that books" });

        }
        return res.status(200).json({ message: "Book retrived successfully", data: book })
    }
}


export default UserController;