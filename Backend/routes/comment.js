const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

// resolve the expense app index form
router.post("/:postId/comment", commentController.addComment);
router.get("/comments/:postId", commentController.fetchAllComments);

module.exports = router;
