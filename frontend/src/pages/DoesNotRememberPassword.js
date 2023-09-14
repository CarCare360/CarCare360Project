import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DoesNotRememberPassword.css';
import forgot from '../components/images/forgotpassword.jpg';
import swal from 'sweetalert';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/password-reset/',
        {
          email,
        }
      );
      console.log(response.data);
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        swal('Reset link was Sent!','', 'success'); // Show success message
        setEmail('');
        window.location.reload();
      }
    } catch (error) {
      console.log(error, 'Login Failed');
    }
  };

  

  

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow integers, alphabets and special characters
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    // Check if the input matches the pattern or is empty
    if (emailRegex.test(inputValue) || inputValue === '') {
      setEmail(inputValue);
    }
  };

  return (
    <Container>
      <div className='forgot__password__container '>
        <Grid container spacing={2}>
          {/* Left side with register customer image */}
          <Grid item xs={12} md={6}>
            <div className='forgot__password__img'>
              <img src={forgot}></img>
            </div>
          </Grid>

          {/* Right side with form components */}
          <Grid item xs={12} md={6}>
            {/* Form */}
            <div className='forgot__password__form'>
              <form onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  {/* Heading */}
                  <div className='forgot__password__heading'>
                    <h2>Forgot Password</h2>
                  </div>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {/* Email */}
                    <TextField
                      className='input-text-login'
                      id='outlined-basic'
                      label='Email'
                      variant='outlined'
                      value={email}
                      type='text'
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      size='small'
                      style={{ width: '80%' }}
                      required
                    />
                  </Grid>
                    

                  <Grid item xs={12} style={{ width: '80%' }}>
                    {/* Submit Button */}
                    <div className='forgot__password__submitbtn'>
                      <Button type='submit' variant='contained'>
                        Submit
                      </Button>
                    </div>
                  </Grid>
                  {/* move to login */}
                  <Grid>
                    <div className='go__back'>
                      <p>
                        Go back login page <Link to='/verify-password'>Back</Link>
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
