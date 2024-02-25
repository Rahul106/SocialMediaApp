const path = require("path");
const rootDir = require("../utils/path");

exports.resolveIndexForm = (req, res, next) => {

  // * Resolve the absolute path to index.html in the correct directory
  const indexPagePath = path.join(rootDir, "../FrontEnd/views", "index.html");

  // * Send the index.html file as the response
  res.sendFile(indexPagePath);
};
