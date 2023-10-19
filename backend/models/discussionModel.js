const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      ref: "User",
    },
    lastPostBy: {
      type: String,
      ref: "User",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "ForumPost",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
