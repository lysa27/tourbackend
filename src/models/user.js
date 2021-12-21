import mongoose from "mongoose";
import { stringify } from "querystring";

const userSchema = new mongoose.Schema(
    {
firstName:String,
lastName: String,
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
role:{
    type:String,
    default:"user",
    enum:["admin","user"]
},
address:String,
gender:{
type:String,
enum:["male","female","other","custom"],
},
    },
{
    timestamps:true,
}
    
    );
    const user = mongoose.model('User', userSchema);
    export default user