import express from "express";
import TourController from "../controllers/tourController";
import Validator from "../middlewares/validator";

const tourRouter = express.Router();

tourRouter.post(
    "/createTour",
        Validator.newTourRules(),
        Validator.validateInput,
     TourController.createTour);
tourRouter.get("/all", TourController.getAllTour)
tourRouter.get("/:id", TourController.getOneTour);
tourRouter.delete("/:id", TourController.deleteOneTour);




export default tourRouter;