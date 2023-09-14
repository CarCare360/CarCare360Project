import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VerifyPassword.css';
import verify from '../components/images/verifypassword.jpg';
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
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password === confirm_password){
        const response = await axios.post('http://localhost:4000/api/password-reset/:id', {
          email,
          password,
        });
      console.log(response.data);
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        swal('Password was Reset!', '', 'success'); // Show success message
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
        window.location.reload();
      }
    }
    else{
      swal('Passwords do not match!', '', 'error'); // Show success message
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
    } catch (error) {
      console.log(error, 'Login Failed');
    }
  };

  return (
    <Container>
      <div className='forgot__password__container '>
        <Grid container spacing={2}>
          {/* Left side with register customer image */}
          <Grid item xs={12} md={6}>
            <div className='forgot__password__img'>
              <img src={verify}></img>
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
                    <h2>Add New Password</h2>
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
                  <Grid item xs={12}>
                    {/* New Password */}
                    <TextField
                      className='input-text-login'
                      id='outlined-password-input'
                      label='New Password'
                      variant='outlined'
                      type='password'
                      value={password}
                      autoComplete='current-password'
                      size='small'
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '80%',
                        height: '5%',
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Confirm New Password */}
                    <TextField
                      className='input-text-login'
                      id='outlined-password-input'
                      label='Confirm New Password'
                      variant='outlined'
                      type='password'
                      value={confirm_password}
                      autoComplete='current-password'
                      size='small'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        width: '80%',
                        marginBottom: '5%',
                        height: '5%',
                      }}
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
