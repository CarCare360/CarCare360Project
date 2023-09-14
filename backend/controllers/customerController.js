const Customer = require('../models/customerModel');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';

// Get All Customers

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(201).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get password of customer
const getPasswordCustomer = async (req, res) => {
  try {
    const { email } = req.body;

    const customers = await Customer.findOne({ email });
    if (!customers) {
      return res.status(401).json({ error: 'No such customer was registered' });
    }
    // const password = await bcrypt(customers.password);

    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = 'Thank You Contacting Car Care 360';
    const message = `
          <h3>Hello </h3>
          <p>Thank you for contacting Car Care 360,</p>
          <p>Your password is</p>`;
          // <p>${password}</p>`;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    return res.status(200).json({ success: true, message: 'Email Sent' });
  } catch (error) {
    res.status(500).json(error.message);
  }

  // try {
  //   const { email } = req.body;
  //   const customers = await Customer.findOne({email})
  //   if(!customers){
  //     return res.status(401).json({ error: 'No such customer was registered' });
  //   }
  //   const password = await bcrypt(customers.password)
  //   return res.status(201).json({password})
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal server error' });
  // }
};

// Get a single customer by ID

const getCustomerById = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customers = await Customer.findOne({ email });
    if (!customers) {
      return res.status(401).json({ error: 'No such customer was registered' });
    }
    const isPasswordValid = await bcrypt.compare(password, customers.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ customerId: customers._id }, SECRET_KEY, {
      expiresIn: '1hr',
    });
    return res.status(201).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: 'Error logging in', error: error.message });
  }
};

// Create a new customer

const createCustomer = async (req, res) => {
  try {
    const { fName, lName, address, phone_no, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      fName,
      lName,
      address,
      phone_no,
      email,
      password: hashedPassword,
    });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  getPasswordCustomer,
};
