import React, { useState } from 'react';
import '../../../styles/registervehicle.css';
import { Box } from '@mui/material';
import Topbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import registerVehicle from '../../../components/images/registerVehicle.jpg';
import {
  TextField,
  Grid,
  Container,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  InputAdornment,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const RegisterVehicle = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [chassisFirstCode, setChasisFirstcode] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState(dayjs());
  const [fuelType, setFuelType] = useState('');
  const [lastServiceMileage, setLastServiceMileage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      registerNumber,
      chassisFirstCode,
      make,
      model,
      lastServiceDate.format('YYYY-MM-DD'),
      fuelType,
      lastServiceMileage
    );
    const vehicle = {
      registerNumber,
      chassisFirstCode,
      make,
      model,
      lastServiceDate: lastServiceDate.format('YYYY-MM-DD'),
      fuelType,
      lastServiceMileage,
    };
    const response = await fetch('api/registervehicle/', {
      method: 'POST',
      body: JSON.stringify(vehicle),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      console.log('Error Registering the vehicle');
    }

    if (response.ok) {
      setRegisterNumber('');
      setChasisFirstcode('');
      setMake('');
      setModel('');
      setLastServiceDate(dayjs());
      setFuelType('');
      setLastServiceMileage(0);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleLastServiceMileageChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow integers or floats
    const pattern = /^[0-9]+(\.[0-9]*)?$/;

    // Check if the input matches the pattern or is empty
    if (pattern.test(inputValue) || inputValue === '') {
      setLastServiceMileage(inputValue);
    }
  };

  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Container>
            <div className='register__vehicle__container '>
              <Grid container spacing={2}>
                {/* Left side with register vehicle image */}
                <Grid item xs={12} md={6}>
                  <div className='register__vehicle__img'>
                    <img src={registerVehicle}></img>
                  </div>
                </Grid>

                {/* Right side with form components */}
                <Grid item xs={12} md={6}>
                  {/* Form */}
                  <div className='register__vehicle__form'>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={4}>
                        {/* Register Number */}
                        <Grid item xs={12}>
                          <TextField
                            className='input-text'
                            id='outlined-basic'
                            label='Register Number'
                            variant='outlined'
                            value={registerNumber}
                            onChange={(e) => {
                              setRegisterNumber(e.target.value);
                            }}
                            style={{ width: '100%' }}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {/* Chasis First Code */}
                          <TextField
                            className='input-text'
                            id='outlined-basic'
                            label='Chasis First Code'
                            variant='outlined'
                            value={chassisFirstCode}
                            onChange={(e) => {
                              setChasisFirstcode(e.target.value);
                            }}
                            required
                            style={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {/* Make */}
                          <TextField
                            className='input-text'
                            id='outlined-basic'
                            label='Make'
                            variant='outlined'
                            value={make}
                            onChange={(e) => {
                              setMake(e.target.value);
                            }}
                            style={{ width: '100%' }}
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {/* Model */}
                          <TextField
                            className='input-text'
                            id='outlined-basic'
                            label='Model'
                            variant='outlined'
                            value={model}
                            onChange={(e) => {
                              setModel(e.target.value);
                            }}
                            style={{ width: '100%' }}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {/* Select Last Service Date */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label='Last Service Date'
                              value={lastServiceDate}
                              onChange={(e) => {
                                setLastServiceDate(e);
                              }}
                              sx={{ width: '100%' }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                          {/* Select Fuel Type */}
                          <FormControl style={{ width: '100%' }}>
                            <InputLabel>Fuel Type</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='register-vehicle-fueltype'
                              value={fuelType}
                              label='Fuel Type'
                              onChange={(e) => {
                                setFuelType(e.target.value);
                              }}
                              required
                            >
                              <MenuItem value={'Gasoline'}>Gasoline</MenuItem>
                              <MenuItem value={'Diesel'}>Diesel</MenuItem>
                              <MenuItem value={'Electric'}>Electric</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          {/* Last Service Mileage */}
                          <TextField
                            className='input-text'
                            id='outlined-basic'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  km
                                </InputAdornment>
                              ),
                            }}
                            label='Last Service Mileage'
                            variant='outlined'
                            value={lastServiceMileage}
                            onChange={handleLastServiceMileageChange}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} style={{ width: '100%' }}>
                          {/* Submit Button */}
                          <div className='register__vehicle__submitbtn'>
                            <Button type='submit' variant='contained'>
                              Register
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
            {/* Snackbar component */}
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity='success'
                sx={{ width: '100%' }}
              >
                Vehicle Registered Successfully
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default RegisterVehicle;
