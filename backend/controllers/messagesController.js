const messageModel = require("../models/messageModel");
const jwt = require("jsonwebtoken");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "Message added succesfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (error) {
    console.log("Error occured");
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const myDetails = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = myDetails;
    console.log(username);
    res.status(200).json({ username });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
