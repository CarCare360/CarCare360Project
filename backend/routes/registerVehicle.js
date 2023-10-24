const express = require("express");

const {
  getVehicles,
  getVehiclesByCustomerID,
  createVehicle,
  updateVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

// GET all vehicles
router.get("/", getVehicles);

// GET vehicle by ID
router.get("/:customerID", getVehiclesByCustomerID);

// POST a new vehicle
router.post("/", createVehicle);

//update vehicle by ID
router.patch("/:id",updateVehicle);

module.exports = router;
