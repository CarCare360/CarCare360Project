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
/*
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
*/

// Get a vehicles by customer ID
const getVehiclesByCustomerID = async (req, res) => {
  const { customerID } = req.params;
  //console.log("CID:",customerID);

  try {
    const vehicles = await Vehicle.find({ customerID }); 
    if (vehicles.length === 0) {
      return res.status(404).json({ error: "No vehicles found for the specified customer" });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};


//patch vehicle
const updateVehicle = async (req, res) => {
  const { id } = req.params; 
  const updates = req.body;

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Update specific fields of the vehicle
    if (updates.registerNumber) {
      vehicle.registerNumber = updates.registerNumber;
    }
    if (updates.chassisFirstCode) {
      vehicle.chassisFirstCode = updates.chassisFirstCode;
    }
    if (updates.make) {
      vehicle.make = updates.make;
    }
    if (updates.model) {
      vehicle.model = updates.model;
    }
    if (updates.lastServiceDate) {
      vehicle.lastServiceDate = updates.lastServiceDate;
    }
    if (updates.fuelType) {
      vehicle.fuelType = updates.fuelType;
    }
    if (updates.lastServiceMileage) {
      vehicle.lastServiceMileage = updates.lastServiceMileage;
    }
    if (updates.customerID) {
      vehicle.customerID = updates.customerID;
    }
    await vehicle.save();

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
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
  getVehiclesByCustomerID,
  createVehicle,
  updateVehicle,
};
