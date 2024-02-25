const path = require("path");
const rootDir = require("../utils/path");
const Comment = require("../models/Comment");
const User = require('../models/User'); 


exports.addComment = async (req, res, next) => {

  try {
    
    const { postId } = req.params;
    const { text, username } = req.body;

    console.log('-----------' +req.body.text)
    console.log(postId);
    console.log(text);
    console.log(username);

    const user = await User.findOne({ username });
    
    if (!user) {
      console.error("User not found.");
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Assuming userId is stored in _id field
    const userId = user.id;


    console.log('------------------------'+userId) 

    const newComment = await Comment.create({
      content : text,
      postId,
      userId, 
      username,
    });

    if (newComment) {
      
      console.error("Comment Posted Successfully.");

      // Return success response with the new comment data
      return res.status(201).json({
        status: "success",
        message: "Comment Posted Successfully.",
        data: newComment,
      });
    
    } else {
      
      console.error("Comment Not Posted Successfully.");

      // Return error response if newComment is null or undefined
      return res.status(500).json({
        status: "error",
        message: "Comment Not Posted Successfully.",
      });

    }

  } catch (error) {
    console.error("Error adding comment:", error.message);
    return res.status(500).json({ error: "Comment Not Posted Successfully." });
  }

};


exports.fetchAllComments = async (req, res) => {

  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId: postId },
      include: [
        {
          model: User,
          attributes: ["username"], // Include the 'username' attribute from User model
        },
      ],
    });

    if(comments.length === 0) {

      return res
      .status(404)
      .json({ status: "404", message: "Failed to create post.", data: [] });

    }

      const commentsWithUsernames = comments.map(comment => ({
        content: comment.content,
        username: comment.user.username, 
      }));
    
      return res
      .status(200)
      .json({ status: "200", message: "Success", data: commentsWithUsernames });

  } catch (error) {
    console.error("Error fetching comments:", error);
    return res
        .status(404)
        .json({ status: "404", message: "Failed to create post.", data: [] });
  }
};
