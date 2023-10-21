const express = require("express");
const router = express.Router();


const {
    barchartdetails,
    scheduledetails,
    recentschedule,
} = require("../controllers/componentsController");


router.route("/barchart").get(barchartdetails);
router.route("/scheduledate").get(scheduledetails);
router.route("/recentschedule").get(recentschedule);

module.exports = router;