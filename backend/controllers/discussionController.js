const Discussion = require("../models/discussionModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    console.log(discussions);
    res.status(200).json(discussions);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports.createDiscussion = async (req, res) => {
  let creator = "";
  const { title, creatorToken } = req.body;
  try {
    const decoded = jwt.verify(creatorToken, process.env.JWT_SECRET);
    console.log(decoded);
    creator = decoded.username;
  } catch (error) {
    console.log(error);
  }
  if (!title || !creator) {
    return res.status(400).json({ title, creator });
  }

  try {
    const newDiscussion = await Discussion.create({
      title,
      creator,
      posts: [],
      lastPostBy: "",
    });
    res.status(201).json({ title, creator });
    console.log({ title, creator });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the forum discussion.",
    });
  }
};

module.exports.updateDiscussion = async (req, res) => {
  const { id, postId, postedBy } = req.body;

  if (!id || !postId || !postedBy) {
    return res.status(400).json({ message: "Missing required data." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such discussion!" });
  }

  try {
    const discussion = await Discussion.findByIdAndUpdate(id, {
      $push: { posts: postId },
      lastPostBy: postedBy,
    });

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found." });
    }

    res.status(201).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the forum discussion.",
    });
  }
};
