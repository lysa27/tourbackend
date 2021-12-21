import userInfos from "../models/user"
import bcrypt from "bcrypt"
import TokenAuth from "../helpers/tokenAuth";
class UserController {
//  create user in db

static async createUser(req,res){
    const hashPassword= bcrypt.hashSync(req.body.password,10);
    req.body.password = hashPassword;
    const user = await userInfos.create(req.body);

    if(!user){
        return res.status(404).json({error:"user not registered"})
    }


    return res
    .status(200)
    .json({message:"user created successfully" , data: user});
}


// get all users
static async getAllUsers(req,res){
    const users = await userInfos.find();

    if(!users){
        return res.status(404).json({error:"user not registered"})
    }


    return res
    .status(200)
    .json({message:" Successfully retrieved users" , data: users});
}
static async getOneUser(req,res){
    const user = await userInfos.findById(req.params.id);
    if(!user){
        return res.status(404).json({error: "user not found"});
    }
    return res
       .status(200)
       .json({message: "user not found successfully", data:user})
}
//delete a user
    static async deleteOneUser(req,res) {
        const user = await userInfos.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({error: "user not found"});
        }
        return res
           .status(200)
           .json({message: "user deleted successfully", data:user})
}

// login function

static async userLogin(req,res){
 const user = await userInfos.findOne({email:req.body.email});

 if(!user){
     return res.status(404).json({ error:"user not found kindly register first"})
 }
  if (bcrypt.compareSync(req.body.password,user.password)){
 user.password=null;
    const token = TokenAuth.tokenGenerator({user:user});
return res.status(200).json({message:"successfully logged in", token: token });
  }
  return res.status(400).json({error: "password is wrong"});
}
}


export default UserController;