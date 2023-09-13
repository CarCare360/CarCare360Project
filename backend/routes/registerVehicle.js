const express = require("express");

const {
  getVehicles,
  getVehicleById,
  createVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

// GET all vehicles
router.get("/", getVehicles);

// GET vehicle by ID
router.get("/:id", getVehicleById);

// POST a new vehicle
router.post("/", createVehicle);

module.exports = router;
