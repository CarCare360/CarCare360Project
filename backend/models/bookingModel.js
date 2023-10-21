const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  isGuest: Boolean,
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: Number,
  make: String,
  model: String,
  registrationNumber: String,
  odoMeter: Number,
  serviceType: String,
  selectedDate: String,
  preferredTime: String,
  status: String,

});

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;