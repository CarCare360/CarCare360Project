import React from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Topbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DateCalendar from './components/DateCalendarComp';
import BarChart from './components/BarChart';


const AdminDashboard = () => {
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 345, height: 400 }}>
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
            <Grid item xs={12} sm={8}>
              <Card sx={{ maxWidth: 500, height: 400 }}>
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
