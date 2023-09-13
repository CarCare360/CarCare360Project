import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import login from '../components/images/login.jpg';
import { GoogleLogin } from 'react-google-login';
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

const clientId =
  '790433585929-p9slfbpl44uau7urp5tu91b5h5trl21j.apps.googleusercontent.com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  },[]);

  const fetchUsers = () => {
    axios
    .get('http://localhost:4000/api/registercustomer/')
    .then((response) => {
      console.log(response.data);
    })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/api/logincustomer/', {
        email,
        password,
      });
      if(response.data){
        localStorage.setItem('token', response.data.token);
        setEmail('');
        setPassword('');
        setOpen(true);
        fetchUsers();
        navigate('/AdminDashboard');
        window.location.reload();

      }
    }catch(error){
      console.log(error, 'Login Failed');
    }
  };
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user: ', res.profileobj);
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res);
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
      <div className='login__customer__container '>
        <Grid container spacing={2}>
          {/* Left side with register customer image */}
          <Grid item xs={12} md={6}>
            <div className='login__customer__img'>
              <img src={login}></img>
            </div>
          </Grid>

          {/* Right side with form components */}
          <Grid item xs={12} md={6}>
            {/* Form */}
            <div className='login__customer__form'>
              <form onSubmit={handleLogin}>
                <Grid item xs={12}>
                  {/* Heading */}
                  <div className='login__customer__heading'>
                    <h2>Login</h2>
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
                    {/* Password */}
                    <TextField
                      className='input-text-login'
                      id='outlined-password-input'
                      label='Password'
                      variant='outlined'
                      type='password'
                      value={password}
                      autoComplete='current-password'
                      size='small'
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '80%',
                        marginBottom: '5%',
                        height: '5%',
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '80%' }}>
                    {/* Signup Button */}
                    <div className='login__vehicle__submitbtn'>
                      <Button type='submit' variant='contained'>
                        Login
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={6} style={{ width: '80%' }}>
                    {/* Forgot Password */}
                    <div className='forgot__password'>
                      <a href='#'>Forgot Password?</a>
                    </div>
                  </Grid>
                  <Grid item xs={6} style={{ width: '80%' }}>
                    {/* Remember Me */}
                    <div className='option_div'>
                      <div className='remember__me'>
                        <input type='checkbox' />
                        <span> Remember me</span>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ width: '80%' }}>
                    {/* Google Signup Button */}
                    <div className='social__icons__login' id='signInDutton'>
                      <p> or Sign Up Using</p>

                      <GoogleLogin
                        className='google__login'
                        clientId={clientId}
                        buttonText='Sign in with Google'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    {/* move to signup */}
                    <div className='already__have__an__account'>
                      <p>
                        Don't have an account?{' '}
                        <Link to='/signup'>Create</Link>
                      </p>
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Vehicle Registered Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
