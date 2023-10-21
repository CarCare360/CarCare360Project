const Vehicle = require("../models/vehicleModel");
const mongoose = require("mongoose");

// Get All Vehicles

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single vehicle by ID

const getVehicleById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such manufacturer recommendation!" });
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: "No such vehicle" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
};

// Create a new vehicle

const createVehicle = async (req, res) => {
  const {
    registerNumber,
    chassisFirstCode,
    make,
    model,
    lastServiceDate,
    fuelType,
    lastServiceMileage,
    customerID,
  } = req.body;
  if (
    !registerNumber ||
    !chassisFirstCode ||
    !make ||
    !model ||
    !lastServiceDate ||
    !fuelType ||
    !lastServiceMileage ||
    !customerID
  ) {
    return res.status(400).json({
      registerNumber,
      chassisFirstCode,
      make,
      model,
      lastServiceDate,
      fuelType,
      lastServiceMileage,
      customerID,
    });
  }

  try {
    const vehicle = await Vehicle.create({
      registerNumber,
      chassisFirstCode,
      make,
      model,
      lastServiceDate,
      fuelType,
      lastServiceMileage,
      customerID,
    });
    res.status(201).json(vehicle);
  } catch {
    res.status(500).json({ error: "While creating the document" });
  }
};



module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
};
