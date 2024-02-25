const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");

// * resolve the expense app index form
router.get("/", indexController.resolveIndexForm);

module.exports = router;
