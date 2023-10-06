import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import register from '../components/images/register.jpeg';
import swal from 'sweetalert';
import { GoogleLogin } from 'react-google-login';
import {
  Container,
  Row,
  Col,
  Form,
  Grid,
  Button,
  InputGroup,
  Modal,
} from 'react-bootstrap';
const clientId =
  '790433585929-p9slfbpl44uau7urp5tu91b5h5trl21j.apps.googleusercontent.com';

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   // fetchUsers();
  // },[]);

  // // const fetchUsers = () => {
  // //   axios
  // //   .get('http://localhost:4000/api/authentication/register')
  // //   .then((response) => {
  // //     console.log(response.data);
  // //   })
  // };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);

      e.preventDefault();

      axios
        .post('http://localhost:4000/api/authentication/register', {
          fName,
          lName,
          address,
          phone_no,
          email,
          password,
        })
        .then(() => {
          swal('Registered!', '', 'success'); // Show success message
          setFname('');
          setLname('');
          setAddress('');
          setPhone_no('');
          setEmail('');
          setPassword('');
          // fetchUsers();
          navigate('/login');
        })
        .catch((error) => {
          swal('Email  is already exist!', '', 'error'); // Show success message
          setFname('');
          setLname('');
          setAddress('');
          setPhone_no('');
          setEmail('');
          setPassword('');
        });
    }
  };

  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user: ', res.profileobj);
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res);
  };

  return (
    <Container>
      <div className='register__customer__container '>
        <Row container spacing={2}>
          {/* Left side with register customer image */}
          <Col item xs={12} md={6}>
            <h2 className='register__customer__heading'>
              Customer Registration
            </h2>
            <div className='register__customer__img'>
              <img src={register}></img>
            </div>
          </Col>

          {/* Right side with form components */}
          <Col item xs={12} md={6}>
            {/* Form */}
            <div className='register__customer__form'>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className='text-left'
              >
                <Row className=' pb-2' >
                  <Form.Group as={Col} controlId='text' item xs={12} md={6} >
                    <Form.Label className='d-flex justify-content-start'>
                      First Name
                    </Form.Label>

                    <Form.Control
                      type='text'
                      placeholder='EX:John'
                      maxLength={25}
                      required
                      value={fName}
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      *Please enter your name
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId='formGridPassword'item xs={12} md={6}>
                    <Form.Label className='d-flex justify-content-start'>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='EX:Smith'
                      maxLength={25}
                      required
                      value={lName}
                      onChange={(e) => setLname(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      *Please enter your last name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className=' pb-2'>
                  <Form.Group as={Col} controlId='formGridAddress' item xs={12} md={6}>
                    <Form.Label className='d-flex justify-content-start'>
                      Address
                    </Form.Label>

                    <Form.Control
                      type='text'
                      placeholder='EX: No:77/C, Colombo 7'
                      maxLength={20}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      *Please enter valiad address
                    </Form.Control.Feedback>
                  </Form.Group>
              
                  <Form.Group as={Col} controlId='formGridPassword'item xs={12} md={6}>
                    <Form.Label
                      htmlFor='inlineFormInputGroup'
                      visuallyHidden
                      className='d-flex justify-content-start'
                    >
                      Mobile Number
                    </Form.Label>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text type='number'>+94</InputGroup.Text>
                      <Form.Control
                        type='tel'
                        pattern='[0-9]{9}'
                        minLength={9}
                        maxLength={9}
                        id='inlineFormInputGroup'
                        placeholder=''
                        required
                        value={phone_no}
                        onChange={(e) => setPhone_no(e.target.value)}
                      />
                      <Form.Control.Feedback type='invalid'>
                        *Please enter a valid mobile number
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className=' pb-2'>
                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label className='d-flex justify-content-start'>
                      Email
                    </Form.Label>
                    <Form.Control
                      type='email'
                      pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
                      placeholder='Enter email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />{' '}
                    <Form.Control.Feedback type='invalid'>
                      *Please enter a valid E-mail
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className=' pb-2'>
                  <Form.Group as={Col} controlId='formGridpassword'>
                    <Form.Label className='d-flex justify-content-start'>
                      Password
                    </Form.Label>
                    <Form.Control
                      type='password'
                      required
                      minLength={6}
                      maxLength={20}
                      value={password}
                      placeholder='Enter Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      *Please enter valid password above 6 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div class='container d-flex justify-content-center'>
                  <Button
                    variant='primary'
                    type='submit'
                    className=' mt-2 justify-content-center'
                  >
                    SIGN UP
                  </Button>
                </div>

                <div className='social__icons__topic' id='signInDutton'>
                  <p> or Sign Up Using</p>

                  {/* Google Signup Button */}
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

                {/* move to login */}
                <div className='already__have__an__account'>
                  <p>
                    Already Have an Account <Link to='/login'>Login</Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Register;
