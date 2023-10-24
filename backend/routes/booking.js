const express = require("express");

const { bookAService } = require("../controllers/bookingController");
const {getbookingsByCustomerID} = require("../controllers/bookingController")
const {deleteBookingById} = require("../controllers/bookingController")


const router = express.Router();

// POST a new booking
router.post("/", bookAService);

// GET booking by customer ID
router.get("/:customerID", getbookingsByCustomerID);

//delete appointment by ID
router.delete("/:id", deleteBookingById);

module.exports = router;
