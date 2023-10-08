import React, { useEffect, useState } from 'react';
import { useNavigate, useMatch} from 'react-router-dom';
import axios from 'axios';
import '../styles/VerifyPassword.css';
import verify from '../components/images/verifypassword.jpg';
import swal from 'sweetalert';
import { Row, Col, Container,Form,Button } from 'react-bootstrap';

const VerifyPassword = () => {
  const match = useMatch('/passwordreset/:resetToken');
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
    e.preventDefault();
    try {
      if(password === confirm_password){
        console.log(email, password);
        const response = await axios.put(`http://localhost:4000/api/authentication/resetpassword/${match.params.resetToken}`, {
          password,
        });
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
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      swal('Try Again!', '', 'error'); // Show success message

    }
  }
  };

  return (
    <Container>
      <div className='forgot__password__container '>
        <Row container spacing={2}>
          {/* Left side with register customer image */}
          <Col item xs={12} md={6}>
            <div className='forgot__password__img'>
              <img src={verify}></img>
            </div>
          </Col>

          {/* Right side with form components */}
          <Col item xs={12} md={6}>
            <h2 className='login__customer__heading'> Customer Login </h2>

            {/* Form */}
            <div className='login__customer__form'>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className='text-left'
              >
                <Row className=' pb-2'>
                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label className='d-flex justify-content-start'>
                      Email
                    </Form.Label>
                    <Form.Control
                      type='email'
                      pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
                      placeholder='Enter Email'
                      required
                      value={email}
                      width={100}
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
                      width={100}
                      placeholder='Enter Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      *Please enter valid password above 6 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className=' pb-2'>
                  <Form.Group as={Col} controlId='formGridpassword'>
                    <Form.Label className='d-flex justify-content-start'>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type='password'
                      required
                      minLength={6}
                      maxLength={20}
                      value={confirm_password}
                      width={100}
                      placeholder='Enter Password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Submit
                  </Button>
                </div> 
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default VerifyPassword;
