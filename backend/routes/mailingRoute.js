const express = require("express");
const router = express.Router();
const {
  createMailingList,
  addemailAddresses,
  getAllMailingLists,
  sendEmail,
} = require("../controllers/mailingListController");

// Create a mailing list
router.post("/createList", createMailingList);

// Get all mailing lists
router.get("/getMailingList", getAllMailingLists);

// Add users to a mailing list
router.post("/addemailAddresses", addemailAddresses);

// Send an email to a mailing list
router.post("/sendEmail", sendEmail);

module.exports = router;
