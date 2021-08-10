import { Router } from 'express';
import {create, findAll, findOne, update, remove, removeAll} from "../controllers/car.controller.js";

var router = Router();

// Create new car
router.post("/", create);

// Get all cars
router.get("/", findAll);

// Get a car
router.get("/:carId", findOne);

// Update a car
router.put("/:carId", update);

// Delete a car
router.delete("/:carId", remove);

// Delete all cars
router.delete("/", removeAll);

export default router;
