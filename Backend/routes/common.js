const express = require("express");
const postRoute = require("./post");
const indexRoute = require("./index");
const commentRoute = require("./comment");

const commonRouter = express.Router();

// Routes with "/mingleglobe" prefix
commonRouter.use("/index", indexRoute);
commonRouter.use("/add", postRoute);
commonRouter.use("/fetch", postRoute);
commonRouter.use("/add", commentRoute);
commonRouter.use("/fetchall", commentRoute);

module.exports = commonRouter;
