const Discussion = require("../models/discussionModel");
const mongoose = require("mongoose");

module.exports.createDiscussion = async (req, res) => {
  const { title, creator, postId } = req.body;
  if (!title || !creator || !postId) {
    return res.status(400).json({ title, creator, postId });
  }

  try {
    const newDiscussion = await Discussion.create({
      title,
      creator,
      posts: [postId],
    });
    res.status(201).json({ title, creator, postId });
    console.log({ title, creator, postId });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the forum discussion.",
    });
  }
};

// update the discussion
module.exports.updateDiscussion = async (req, res) => {
  const { id, postId } = req.body;
  if (!id || !postId) {
    return res.status(400).json({ id, postId });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such discussion!" });
  }

  try {
    const discussion = await Discussion.findOneAndUpdate(
      { _id: id },
      { $push: { posts: postId } }
    );
    res.status(201).json(discussion);
    console.log({ id, postId });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the forum discussion.",
    });
  }
};
