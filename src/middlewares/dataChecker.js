import userInfos  from "../models/user";

class DataChecker{

    // check if user email exist
    static async isEmailExist (req,res,next){
        const user = await userInfos.findOne({email: req.body.email});
        if(!user){
            return next();
        }
        return res.status(401).json({error:"email is already exist!"})
    }
}
export default DataChecker