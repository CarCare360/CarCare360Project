const express = require("express");

const {
  getCustomerById,
} = require("../controllers/customerController");

const router = express.Router();



// GET a single customer by ID
router.post("/", getCustomerById);


module.exports = router;
