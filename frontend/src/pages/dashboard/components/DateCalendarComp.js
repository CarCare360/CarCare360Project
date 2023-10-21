// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const BookingCalendar = () => {
  const [bookingDates, setBookingDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingData()
      .then((data) => {
        console.log('Booking Data:', data);
        setBookingDates(data.dates || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
        setLoading(false);
      });
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/components/scheduledate'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const localizer = momentLocalizer(moment);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={bookingDates.map((booking) => ({
            start: new Date(booking.selectedDate),
            title: `Name: ${booking.firstName} ${booking.lastName}, Email: ${booking.email}, Service Type: ${booking.serviceType}`,
          }))}
          startAccessor='start'
          style={{ height: 400 }}
        />
      )}
    </div>
  );
};

export default BookingCalendar;
