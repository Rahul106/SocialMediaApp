const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// * Create an Express application
const app = express();

// * Define the path to the 'public' directory
const publicPath = path.join(__dirname, "../FrontEnd/public");

// * Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());

// * Serve static files from the 'public' directory
app.use(express.static(publicPath));

// * Import route handlers
const commonRoutes = require("./routes/common");

// * Mount the imported routes under the path '/mingleglobe'
app.use("/mingleglobe", commonRoutes);

// * Define the port on which the server will listen, using environment variable PORT or defaulting to 3000
const PORT = process.env.PORT || 3000;

//! Define associations with CASCADE and constraints
User.hasMany(Post, {onDelete: "CASCADE"});
Post.belongsTo(User);
Post.hasMany(Comment, {onDelete: "CASCADE"});
Comment.belongsTo(Post);
User.hasMany(Comment, {onDelete: "CASCADE"});
Comment.belongsTo(User);

// ? Sync the Sequelize models with the database, then start the server
sequelize
  //.sync({ force: true })
  .sync()
  .then(() => {
    console.log("Models synced with database");
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.error("Error syncing models with database:", err);
  });

