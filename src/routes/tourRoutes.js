import express from "express";
import TourController from "../controllers/tourcontroller";
import Validator from "../middlewares/validator";
import verifyToken from "../middlewares/verifyToken";
import verifyAccess from "../middlewares/verifyAccess";
const tourRouter = express.Router();

tourRouter.post(
    "/createTour",
    verifyToken,
    verifyAccess("admin"),
        Validator.newTourRules(),
        Validator.validateInput,
     TourController.createTour);
tourRouter.get("/all", TourController.getAllTour)
tourRouter.get("/:id", TourController.getOneTour);
tourRouter.delete("/:id", TourController.deleteOneTour);




export default tourRouter;