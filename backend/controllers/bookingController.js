const bookingModel = require("../models/bookingModel");
const whatsappController = require("../controllers/whatsappController");

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
    //Sending appointment confirmation whatsapp msg to customer
    const msgBody = `Dear ${firstName} ${lastName},
    *Service Appointment Confirmed!* 
          vehicle: ${make} ${model}
          RegNum: ${registrationNumber} 
          📅 Date: ${selectedDate} 
          ⏰ Time: ${preferredTime} \nThank you!
    We are waiting for you!`;
    whatsappController.sendWAppMsg(mobileNumber, msgBody);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "While creating the document" });
  }
};

module.exports = {
  bookAService,
};
