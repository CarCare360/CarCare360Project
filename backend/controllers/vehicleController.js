const Vehicle = require("../models/vehicleModel");
const mongoose = require("mongoose");
const {
  sendServiceReminder,
} = require("../controllers/serviceReminderController");

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
      return res
        .status(404)
        .json({ error: "No vehicles found for the specified customer" });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//patch vehicle
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { currentMileage, userData } = req.body; // Destructure the properties directly from req.body

  // console.log("Current Mileage:", currentMileage);
  // console.log("User Data:", userData);

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Update specific fields of the vehicle
    // if (updatedVehicle.registerNumber) {
    //   vehicle.registerNumber = updatedVehicle.registerNumber;
    // }
    // if (updatedVehicle.chassisFirstCode) {
    //   vehicle.chassisFirstCode = updatedVehicle.chassisFirstCode;
    // }
    // if (updatedVehicle.make) {
    //   vehicle.make = updatedVehicle.make;
    // }
    // if (updatedVehicle.model) {
    //   vehicle.model = updatedVehicle.model;
    // }
    // if (updatedVehicle.lastServiceDate) {
    //   vehicle.lastServiceDate = updatedVehicle.lastServiceDate;
    // }
    // if (updatedVehicle.fuelType) {
    //   vehicle.fuelType = updatedVehicle.fuelType;
    // }
    // if (updatedVehicle.lastServiceMileage) {
    //   vehicle.lastServiceMileage = updatedVehicle.lastServiceMileage;
    // }
    // if (updatedVehicle.customerID) {
    //   vehicle.customerID = updatedVehicle.customerID;
    // }
    if (currentMileage) {
      vehicle.currentMileage = currentMileage;
    }

    await vehicle.save();
    await sendServiceReminder(vehicle, userData);

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log(error);
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
    currentMileage,
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
      currentMileage,
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
      currentMileage,
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
