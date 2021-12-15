// this file will validate all function created
import {check, validationResult} from "express-validator";

class Validator{
static validateInput =(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
const errorMessage = errors.errors.map((err)=>err.msg);
        return res.status(400).json({message:errorMessage});
    }
    return next();
};
static newAccountRules(){
    return[
        check("email","email is invalid").trim().isEmail(),
        check("password","password is not strong").trim().isStrongPassword(),
        check ("LastName","last name should be valid").trim().isString(),
        check("firstName","first name should be valid").trim().isString(),
        check(
            "gender",
            "Gender should be valid among male,female,other,not-say"
            )
            .trim()
            .isIn(["male","female","other","not-say"])
    ]
}







static newTourRules(){
    return[
        check("title","title is invalid").trim().isString(),
        check("dueDate","date is not valid").trim().isDate(),
        check("dateScheduled","date is not valid").trim().isDate(),
        check ("name","name should be valid").trim().isString(),

    //     check("firstName","first name should be valid").trim().isAlpha(),
    //     check(
    //         "gender",
    //         "Gender should be valid among male,female,other,not-say"
    //         )
    //         .trim()
    //         .isIn(["male","female","other","not-say"])
     ]
};
}
export default Validator;