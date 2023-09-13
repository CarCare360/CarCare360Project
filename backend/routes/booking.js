const express = require("express");

const { bookAService } = require("../controllers/bookingController");

const router = express.Router();

// POST a new booking
router.post("/", bookAService);

module.exports = router;
