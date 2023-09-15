const Customer = require('../models/customerModel');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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
    const customers = await Customer.findOne({ email });
    if (!customers) {
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
    } else {
      return res.status(401).json({ error: 'Customer already exist' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const customers = await Customer.findOne({ email });
    const name = ' ' + customers.fName + ' ' + customers.lName;
    if (!customers) {
      return res.status(401).json({ error: 'No such customer was registered' });
    }
    let token = customers._id;
    console.log(token);
    if (!token) {
      token = await new Customer({
        customerId: customers._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }
    console.log(token);
    const url = `${process.env.BASE_URL}/password-reset/${customers._id}/`;
    const message = `
          <h3>Hello ${name} ,</h3>
          <p>Thank you for contacting Car Care 360,</p>
          <p>For reset password Click here  ${url}</p>`;

    await sendEmail(
      'Password Reset',
      message,
      email,
      process.env.EMAIL_USER,
      email
    );

    res
      .status(200)
      .send({ message: 'Password reset link sent to your email account' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal server error', error: error.message });
  }
};

//set new password
const setNewPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const customers = await Customer.findOne({ email });
    console.log(customers);
    if (!customers) {
      return res.status(401).json({ error: 'No such customer was registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    customers.password = hashedPassword;
    await customers.save();
    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  getPasswordCustomer,
  resetPassword,
  setNewPassword,
};
