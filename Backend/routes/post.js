const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

// resolve the expense app index form
router.post("/post", postController.postAddPost);
router.get("/posts", postController.fetchAllPost);

module.exports = router;
