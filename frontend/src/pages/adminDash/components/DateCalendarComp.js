import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function ServerDay(props) {
  const { bookingData = [], day, outsideCurrentMonth, ...other } = props;

  const isScheduled = bookingData.some((booking) =>
    dayjs(booking.selectedDate).isSame(day, 'day')
  );

  return (
    <Tooltip title={getTooltipContent(day, bookingData)} arrow>
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{
          borderRadius: isScheduled ? '100%' : '0', // Round the scheduled date
          backgroundColor: isScheduled ? '#1E88E5' : 'transparent', // Blue color for scheduled dates
          cursor: 'default',
        }}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    </Tooltip>
  );
}

function getTooltipContent(selectedDay, bookingData) {
  const daySchedules = bookingData.filter((booking) =>
    dayjs(booking.selectedDate).isSame(selectedDay, 'day')
  );

  if (daySchedules.length === 0) {
    return dayjs(selectedDay).format('MMMM YYYY'); // Show only month and year when no schedule
  }

  return (
    <div>
      <p>Date: {dayjs(selectedDay).format('YYYY-MM-DD')}</p>
      <h3>Schedule Details</h3>
      <ul>
        {daySchedules.map((schedule) => (
          <li key={schedule.selectedDate}>
            <p>Full Name: {`${schedule.firstName} ${schedule.lastName}`}</p>
            <p>Service Type: {schedule.serviceType}</p>
            <p>preferredTime: {schedule.preferredTime}</p>
          </li>
        ))}
      </ul>
      <p>Occurrences: {daySchedules.length}</p>
    </div>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = () => {
    const controller = new AbortController();

    fetch('http://localhost:4000/api/components/scheduledate', {
      method: 'GET',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(({ bookingData }) => {
        setHighlightedDays(bookingData); // Save the entire booking data
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays();
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = () => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (props) => <ServerDay {...props} bookingData={highlightedDays} />,
        }}
        slotProps={{
          day: {
            bookingData: highlightedDays, // Pass the entire booking data from the backend
          },
        }}
      />
    </LocalizationProvider>
  );
}
