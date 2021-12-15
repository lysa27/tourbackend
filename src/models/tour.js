import mongoose from "mongoose";
import { stringify } from "querystring";

const tourSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        seats: String,
        available: String,
        dateScheduled: String,
        dueDate: String,
        phone: String,
        images:[
            {
                type:String
            }
        ],
        price: String,
        user: {
            name: String,
            phone: String
        },
        tripDescription: String,
    },
{
    timestamps:true,
}
    
    );
    const tour = mongoose.model('Tour', tourSchema);
    export default tour