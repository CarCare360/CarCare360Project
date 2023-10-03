const Post = require('../models/forumPostModel'); // Import the Post model

// Create a new post
module.exports.createPost = async (req, res) => {
  const { content, author, discussionId } = req.body;

  if (!discussionId || !content || !author) {
    return (
      res.status(400).json({ content, author, discussionId })
    );
  }
  try {
    const newPost = await Post.create({
      discussionId,
      content,
      author,
    });
    console.log({
      discussionId,
      content,
      author,
    });
    res.status(201).json({ discussionId, content, author });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the post.' });
  }
};

// Get posts by discussionId
module.exports.getPostsByDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const posts = await Post.find({ discussionId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
};

// // Get a single post by ID
// exports.getPostById = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId);
//     if (!post) {
//       res.status(404).json({ message: "Post not found." });
//     } else {
//       res.status(200).json(post);
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the post." });
//   }
// };

// // Update a post by ID
// exports.updatePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
//       new: true,
//     });
//     if (!updatedPost) {
//       res.status(404).json({ message: "Post not found." });
//     } else {
//       res.status(200).json(updatedPost);
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the post." });
//   }
// };

// // Delete a post by ID
// exports.deletePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const deletedPost = await Post.findByIdAndDelete(postId);
//     if (!deletedPost) {
//       res.status(404).json({ message: "Post not found." });
//     } else {
//       res.status(204).send(); // No content (successful deletion)
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the post." });
//   }
// };
