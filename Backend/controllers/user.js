const User = require("../models/User");

exports.createUser = async (username) => {
  
    try {
      
      const userObj = { username };
      const userResp = await User.create(userObj);
      return userResp;
    
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error("Failed to create user.");
    }
  
};

