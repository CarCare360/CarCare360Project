const bookingModel = require("../models/bookingModel");

exports.barchartdetails = async (req, res, next) => {
  try {
    // Fetch customer count data from the MongoDB collection
    const bookingData = await bookingModel.find({}, 'selectedDate email');

    // Format the data to match the structure expected by the chart
    const chartData = [['Days', 'Customer']];
    const customerCounts = {}; // Using an object to store customer counts for each day

    bookingData.forEach((booking) => {
      const dayOfWeek = getDayOfWeek(booking.selectedDate);
      const email = booking.email;

      // Generate a unique key for each day and email combination
      const key = `${dayOfWeek}_${email}`;

      // Increment the customer count for the day and email combination
      customerCounts[key] = (customerCounts[key] || 0) + 1;
    });

    // Convert the customerCounts object to the chartData array
    Object.entries(customerCounts).forEach(([key, count]) => {
      const [dayOfWeek, email] = key.split('_');
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
      const bookingData = await bookingModel.find({}, 'selectedDate email serviceType firstName lastName');
  
      res.status(200).json({ bookingData });
    } catch (error) {
      console.error('Error fetching booking data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.recentschedule = async (req, res, next) => {
    try {
      // Fetch recent booking data from the MongoDB collection, sorted by selectedDate in descending order
      const recentBookingData = await bookingModel
        .find({}, '_id, firstName, lastName,serviceType,')
        .sort({ selectedDate: -1 }) // Sort in descending order based on selectedDate
        .limit(5); // Limit to the most recent 5 bookings (adjust the number as needed)
  
      res.status(200).json({ recentBookingData });
    } catch (error) {
      console.error('Error fetching recent booking data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Helper function to get the day of the week from a date string
function getDayOfWeek(dateString) {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}
