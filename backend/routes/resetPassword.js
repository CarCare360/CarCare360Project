const express = require('express');
const {getPasswordCustomer} = require('../controllers/customerController');
const {resetPassword} = require('../controllers/customerController');

const router = express.Router();

// GET a single customer by ID
// router.post('/', getPasswordCustomer);
router.post('/', resetPassword);

module.exports = router;
