const path = require("path");
const rootDir = require("../utils/path");
const userController = require("../controllers/user");
const User = require("../models/User");
const Post = require("../models/Post");

exports.fetchAllPost = async (req, res, next) => {
  
  try {
    
    // Fetch all posts, including the associated User data
    const allPostData = await Post.findAll({
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    console.log("All Posts:", allPostData);

    // Check if allPostData is null or empty
    if (!allPostData || allPostData.length === 0) {
      console.log("No posts found.");

      return res
        .status(200)
        .json({ status: "success", message: "No posts found.", data: [] });
    }

    // Return allPostData if posts are found
    return res.status(200).json({ status: "success", data: allPostData });
  
  } catch (error) {
    // Handle any errors that occur during the entire operation
    console.error("Error fetching posts:", error.message);
    
    // Return error response
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch posts." });
  }

};


const createPost = async (postLink, postDescription, userId) => {

  try {
    
    const postObj = {
      postLink,
      postDescription,
      userId,
    };

    const postResp = await Post.create(postObj);
    return postResp;
  
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw new Error("Failed to create post.");
  }

};


exports.postAddPost = async (req, res, next) => {
  
  try {
    
    // Print req.body separately
    console.log("Request Body:", req.body);

    // Extract username, postLink, and postDescription from req.body
    const { username, postLink, postDescription } = req.body;

    // Check if username is provided
    if (!username) {
      console.error("Username is required.");
      
      return res
        .status(400)
        .json({ status: "error", message: "Username is required." });
    }

    // Create user and handle user creation response
    const userResp = await userController.createUser(username);
    
    if (!userResp) {
      
      // Return error response if userResp is null or undefined
      console.error("Failed to create user.");
      
      return res
        .status(500)
        .json({ status: "error", message: "Failed to create user." });
    }

    // Create post and handle post creation response
    const postResp = await createPost(
      postLink,
      postDescription,
      userResp.id
    );

    if (postResp) {
      
      // Return success response if post creation is successful
      return res.status(201).json({
        status: "success",
        message: "Post created successfully.",
        data: postResp,
      });
    
    } else {
      
      // Return error response if postResp is null or undefined
      console.error("Failed to create post.");
      return res
        .status(500)
        .json({ status: "error", message: "Failed to create post." });
    
    }

  } catch (error) {
    console.error("Error creating post:", error.message);

    // Return error response
    return res
      .status(500)
      .json({ status: "error", message: "Failed to create post." });
  }

};
