import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Booking from '../../Booking'

const RegUserBooking = () => {
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Booking/>
        </Box>
      </Box>
    </>
  );
};

export default RegUserBooking;
