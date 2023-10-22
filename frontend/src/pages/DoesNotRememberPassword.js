import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DoesNotRememberPassword.css';
import forgot from '../components/images/forgotpassword.jpg';
import swal from 'sweetalert';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

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
        const response = await axios.post(
          'http://localhost:4000/api/authentication/forgotpassword',
          {
            email,
          }
        );
        console.log(response.data);
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          swal('Reset link was Sent!', '', 'success'); // Show success message
          setEmail('');
          window.location.reload();
        }
      } catch (error) {
        swal('Invalid Credential!', '', 'error'); // Show success message
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
              <img src={forgot}></img>
            </div>
          </Col>

          {/* Right side with form components */}
          <Col item xs={12} md={6}>
            {/* Form */}
            <div className='forgot__password__form'>
              {/* Heading */}
              <div className='forgot__password__heading'>
                <h2>Forgot Password</h2>
              </div>
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

                <div class='container d-flex justify-content-center'>
                  <Button
                    variant='primary'
                    type='submit'
                    className=' mt-2 justify-content-center'
                  >
                    Submit
                  </Button>
                </div>
                {/* move to login */}
                <div className='go__back'>
                  <p>
                    Go back login page <Link to='/login'>Back</Link>
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

export default Login;
