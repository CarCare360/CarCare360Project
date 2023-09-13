import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MessageSystem = () => {
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Message System</h1>
        </Box>
      </Box>
    </>
  );
};

export default MessageSystem;
