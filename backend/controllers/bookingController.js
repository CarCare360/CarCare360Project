const bookingModel = require('../models/bookingModel');
// const whatsappController = require('../controllers/whatsappController');
const sendEmail = require('../utils/sendEmail');

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
    customerID,
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
      customerID,
      status: 'Scheduled',
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
      customerID,
      status: 'scheduled',
    });

    // Sending appointment confirmation email to customer
    const msgBody = `
                    <h2> Welcome to Car Care 360 </h2>
                    <p>Hello ${firstName} ${lastName},</p>
                    <p><strong>Service Appointment Confirmed! 🎉</strong></p>
                    <p> 🚗 Vehicle: ${make} ${model} </p>
                    <p> 🔍 RegNum: ${registrationNumber} </p>
                    <p> 📅 Date: ${selectedDate} </p>
                    <p> ⏰ Time: ${preferredTime} </p>
                    <p>Thank you! We are waiting for you! 🤝</p>
                  `;
    console.log(msgBody);
    await sendEmail({
      to: email, 
      subject: 'Service Appointment Confirmed!',
      text: msgBody,
    });

    // Send WhatsApp message
    // whatsappController.sendWAppMsg(mobileNumber, msgBody);

    res.status(200).json({ success: true, data: 'Email Sent' });
  } catch (error) {
    res.status(500).json({ error: 'Email could not be sent' });
  }
};

// Get a booking by customer ID
const getbookingsByCustomerID = async (req, res) => {
  const { customerID } = req.params;
  //console.log("CID:",customerID);

  try {
    const bookings = await bookingModel.find({ customerID });
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ error: 'No bookings found for the specified customer' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Delete a booking by Object ID
const deleteBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const deletedBooking = await bookingModel.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // You can add additional logic here, such as sending a confirmation message.

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the booking' });
  }
};

module.exports = {
  bookAService,
  getbookingsByCustomerID,
  deleteBookingById,
};
