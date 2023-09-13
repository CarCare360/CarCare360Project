const express = require("express");

const {
  getCustomers,
  getCustomerById,
  createCustomer,
} = require("../controllers/customerController");

const router = express.Router();

// GET all customer
router.get("/", getCustomers);


// POST a new customer
router.post("/", createCustomer);

module.exports = router;
