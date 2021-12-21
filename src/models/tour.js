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
        images: [
            {
                type: String
            }
        ],
        price: String,
        user: {
            name: String,
            phone: String
        },
        tripDescription: String,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }

);

tourSchema.pre(/^find/, function (next) {
    this. populate({ 
        path: "user", 
        select:"LastName email address"
});
    next();
})

const tour = mongoose.model('Tour', tourSchema);
export default tour