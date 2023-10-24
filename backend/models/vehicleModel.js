const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  registerNumber: {
    type: String,
    required: true,
  },
  chassisFirstCode: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  lastServiceDate: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  lastServiceMileage: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
  },
  currentMileage: {
    type: String,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
