// componentsController.js

const bookingModel = require('../models/bookingModel');

exports.barchartdetails = async (req, res, next) => {
  try {
    // Fetch customer count data from the MongoDB collection
    const bookingData = await bookingModel.find({}, 'selectedDate');

    // Format the data to match the structure expected by the chart
    const chartData = [['Days', 'Customer']];
    const customerCounts = {}; // Using an object to store customer counts for each day

    bookingData.forEach((booking) => {
      const dayOfWeek = getDayOfWeek(booking.selectedDate);

      // Generate a unique key for each day
      const key = `${dayOfWeek}`;

      // Increment the customer count for the day
      customerCounts[key] = (customerCounts[key] || 0) + 1;
    });

    // Convert the customerCounts object to the chartData array
    Object.entries(customerCounts).forEach(([dayOfWeek, count]) => {
      chartData.push([dayOfWeek, count]);
    });

    // Send the formatted data as a response
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching booking data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.scheduledetails = async (req, res, next) => {
  try {
    const bookingData = await bookingModel.find(
      {},
      'firstName lastName email serviceType selectedDate preferredTime'
    );

    // Map the data to the required format
    const formattedData = bookingData.map((booking) => ({
      selectedDate: booking.selectedDate,
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      serviceType: booking.serviceType,
      preferredTime: booking.preferredTime,
    }));

    res.status(200).json({ bookingData: formattedData });
  } catch (error) {
    console.error('Error fetching booking data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.recentschedule = async (req, res, next) => {
  try {
    const recentBookingData = await bookingModel
      .find({}, '_id firstName lastName serviceType status lastUpdate ')
      .sort({ lastUpdate: -1 })
      .limit(5);

    res.status(200).json({ recentBookingData });
  } catch (error) {
    console.error('Error fetching recent booking data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    // Implement your logic for updating details using the ID and updated data
    // Example: Update data in the bookingModel collection
    const updatedRecord = await bookingModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Send a response with the updated record or any relevant information
    res.status(200).json({ success: true, message: 'Details updated successfully', updatedRecord });
  } catch (error) {
    console.error('Error updating details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

function getDayOfWeek(dateString) {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}
