const express = require('express');
const {getPasswordCustomer} = require('../controllers/customerController');

const router = express.Router();

// GET a single customer by ID
router.post('/', getPasswordCustomer);

module.exports = router;
