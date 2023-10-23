const express = require("express");
const router = express.Router();

const {
    barchartdetails,
    scheduledetails,
    recentschedule,
    updateDetails, // Import the new controller function
} = require("../controllers/componentsController");

router.route("/barchart").get(barchartdetails);
router.route("/scheduledate").get(scheduledetails);
router.route("/recentschedule").get(recentschedule);

// New route for updating details
router.route("/update/:id").put(updateDetails);

module.exports = router;
