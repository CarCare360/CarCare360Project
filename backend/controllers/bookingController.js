const bookingModel = require("../models/bookingModel");
const mongoose = require("mongoose");

const bookAService = async (req, res) => {
  const {
    isGuest,
    firstName,
    lastName,
    email,
    mobileNumber,
    make,
    model,
    registrationNumber,
    odoMeter,
    serviceType,
    selectedDate,
    preferredTime,
  } = req.body;

  if (
    !isGuest ||
    !firstName ||
    !lastName ||
    !email ||
    !mobileNumber ||
    !make ||
    !model ||
    !registrationNumber ||
    !odoMeter ||
    !serviceType ||
    !selectedDate ||
    !preferredTime
  ) {
    return res.status(400).json({
      isGuest,
      firstName,
      lastName,
      email,
      mobileNumber,
      make,
      model,
      registrationNumber,
      odoMeter,
      serviceType,
      selectedDate,
      preferredTime,
    });
  }

  try {
    // Create a new document using the bookingModel
    const createdBooking = await bookingModel.create({
      isGuest,
      firstName,
      lastName,
      email,
      mobileNumber,
      make,
      model,
      registrationNumber,
      odoMeter,
      serviceType,
      selectedDate,
      preferredTime,
    });

    res.status(201).json(createdBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "While creating the document" });
  }
};

module.exports = {
  bookAService,
};
