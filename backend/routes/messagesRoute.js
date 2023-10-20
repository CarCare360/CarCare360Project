const express = require("express");
const {
  addMessage,
  getAllMessage,
  getMe,
} = require("../controllers/messagesController");

const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessage);
router.get("/getme/:token", getMe);

module.exports = router;
