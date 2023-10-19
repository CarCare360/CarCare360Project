const express = require("express");

const {
  createPost,
  getPostsByDiscussion,
} = require("../controllers/forumPostController");

const {
  createDiscussion,
  updateDiscussion,
  getDiscussions,
} = require("../controllers/discussionController");

const router = express.Router();

// Discussion routes
router.post("/createDiscussion", createDiscussion);
router.patch("/updateDiscussion", updateDiscussion);
router.get("/getDiscussions", getDiscussions);

// Post routes
router.get("/getPosts/:discussionId", getPostsByDiscussion);
router.post("/createPost", createPost);

module.exports = router;
