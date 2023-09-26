const customerModel = require('../models/customerModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.register = async (req, res, next) => {
  const { fName, lName, address, phone_no, email, password } = req.body;
  try {
    const customer = await customerModel.create({
      fName,
      lName,
      address,
      phone_no,
      email,
      password,
    });
    sendToken(customer, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  try {
    const customer = await customerModel.findOne({ email }).select('+password');

    if (!customer) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    const isMatch = await customer.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendToken(customer, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const customer = await customerModel.findOne({ email });
    if (!customer) {
      return next(new ErrorResponse('Email could not be sent', 404));
    }
    const resetToken = customer.getResetPasswordToken();
    await customer.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
            <h1>Hello, Welcome to Car Care 360 </h1>
            <h2>You have requested a password reset</h2>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            `;
    try {
      await sendEmail({
        to: customer.email,
        subject: 'Password Reset Request',
        text: message
      });
      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
      customer.resetPasswordToken = undefined;
      customer.resetPasswordExpire = undefined;
      await customer.save();
      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    try {
        const customer = await customerModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!customer) {
            return next(new ErrorResponse('Invalid Reset Token', 400));
        }
        customer.password = req.body.password;
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpire = undefined;
        await customer.save();
        res.status(201).json({
            success: true,
            data: 'Password Reset Success',
            token: customer.getSignedToken(),
        });
    } catch (error) {
        next(error);
    }
};

const sendToken = (customer, statusCode, res) => {
  const token = customer.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};