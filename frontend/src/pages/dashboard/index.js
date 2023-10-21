import React from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Topbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DateCalendar from './components/DateCalendarComp';
import BarChart from './components/BarChart';
import RecentServiceTable from './components/RecentServiceTable';

const AdminDashboard = () => {
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card sx={{ maxWidth: 1100, height: 400 }}>
                <CardContent>
                  <Typography gutterBottom component='div'>
                    Recent Booking
                  </Typography>
                  <Typography color='text.secondary'>
                    <RecentServiceTable />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 600, height: 500 }}>
                <CardContent>
                  <Typography gutterBottom component='div'>
                    Schedule Calendar
                  </Typography>
                  <Typography color='text.secondary'>
                    <DateCalendar />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 500, height: 500 }}>
                <CardContent>
                  <Typography gutterBottom component='div'>
                    Statastics of Customers
                  </Typography>
                  <Typography color='text.secondary'>
                    <BarChart />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
