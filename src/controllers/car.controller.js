import Car from "../models/car.model.js";

// Create a new car
export const create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Request body requires make and model of the car"
    });
  }

  const car = new Car({make: req.body.make, model: req.body.model});
  Car.create(car, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Error occurred while creating a car."
      });
    else {
      res.json(data);
    }
  });
}

// Get all cars
export const findAll = (req, res) => {
    Car.getAll((err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Error occurred while retrieving cars."
          });
        else res.json(data);
      });
}

// Get a car
export const findOne = (req, res) => {
    Car.findById(req.params.carId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Car with id ${req.params.carId} not found.`
            });
          } else {
            res.status(500).json({
              message: "Error retrieving car with id " + req.params.carId
            });
          }
        } else res.json(data);
      });
}

// Update a car
export const update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).json({
          message: "Request body requires make and model of the car"
        });
      }
    
      Car.updateById(
        req.params.carId,
        new Car(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).json({
                message: `Car with id ${req.params.carId} not found.`
              });
            } else {
              res.status(500).json({
                message: "Error retrieving car with id " + req.params.carId
              });
            }
          } else res.json(data);
        }
      );
}

// Delete a car
export const remove = (req, res) => {
    Car.remove(req.params.carId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Car with id ${req.params.carId} not found.`
            });
          } else {
            res.status(500).json({
              message: "Error retrieving car with id " + req.params.carId
            });
          }
        } else res.json({ message: `Car with ${req.params.carId} was deleted successfully.` });
      });
}

// Delete all cars
export const removeAll = (req, res) => {
    Car.removeAll((err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Error occurred while deleting all cars."
          });
        else res.json({ message: `All cars were deleted.` });
      });
}