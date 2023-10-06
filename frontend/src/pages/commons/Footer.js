import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <div className='footer'>
    <Container>
      <footer className='page-footer font-small pt-4'>
        <div className='container-fluid text-center text-md-left'>
          <div className='row'>
            <div className='col-md-6 mt-md-0 mt-3'>
              <h4 className='text-uppercase'>Our Services</h4>
              <p className='our__servicess'>
                Delve into our extensive range of automotive services,
                encompassing regular maintenance, repairs, and a host of
                additional offerings.
              </p>
            </div>

            <hr className='clearfix w-100 d-md-none pb-0' />

            <div className='col-md-3 mb-md-0 mb-3'>
              <h6 className='text-uppercase'>ABOUT CAR CARE 360</h6>
              <ul className='list-unstyled'>
                <li className='mb-3'>
                  <a href='#!'>Schedule Appointment</a>
                </li>
                <li className='mb-3'>
                  <a href='#!'>Service Packages</a>
                </li>
                <li className='mb-3'>
                  <a href='#!'>Contact Us</a>
                </li>
                <li className='mb-3'>
                  <a href='#!'>Special Offers</a>
                </li>
              </ul>
            </div>

            <div className='col-md-3 mb-md-0 mb-3'>
              <h6 className='text-uppercase'>CAR CARE 360 (PRIVATE) LIMITED</h6>
              <ul className='list-unstyled'>
                <li>
                  <p>No: 45/R, Katubedda Junction</p>
                </li>
                <li>
                  <p>Moratuwa</p>
                </li>
                <li>
                  <p>Phone: (123) 456-7890</p>
                </li>
                <li>
                  <p>CarCare360.info@gmail.com</p>
                </li>
              </ul>
              <ul className='social-icons'>
                <a
                  href='https://www.facebook.com/sample'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i>
                    <FaFacebook />
                  </i>
                </a>
                <a
                  href='https://www.twitter.com/sample'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i>
                    <FaTwitter />
                  </i>
                </a>
                <a
                  href='https://www.instagram.com/sample'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i>
                    <FaInstagram />
                  </i>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <div className='footer-copyright text-center py-3'>
          © 2023 Copyright:
          <a href='/'> CarCare360</a>
        </div>
      </footer>
    </Container>
  </div>
);

export default Footer;
