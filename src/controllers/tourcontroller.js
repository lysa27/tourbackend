import tourInfos from "../models/tour"

class TourController {
//  create user in db

static async createTour(req,res){
    const tour = await tourInfos.create(req.body);

    if(!tour){
        return res.status(404).json({error:"tour not registered"})
    }


    return res
    .status(200)
    .json({message:"tour created successfully" , data: tour});
}

// getAllTours
static async getAllTour(req,res){
    const tours = await tourInfos.find();

    if(!tours){
        return res.status(404).json({error:" tour not registered"})
    }


    return res
    .status(200)
    .json({message:" Successfully retrieved tour" , data: tours});
}
static async getOneTour(req,res){
    const tour = await tourInfos.findById(req.params.id);
    if(!tour){
        return res.status(404).json({error: "tour not found"});
    }
    return res
       .status(200)
       .json({message: "tour not found successfully", data:tour})
}
//delete a tour
    static async deleteOneTour(req,res) {
        const tour = await tourInfos.findByIdAndDelete(req.params.id);
        if(!tour){
            return res.status(404).json({error: "tour not found"});
        }
        return res
           .status(200)
           .json({message: "tour deleted successfully", data:tour})
}
}


export default TourController;