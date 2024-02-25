# SocialMediaApp

# app_runner.js

//This line imports the express.js framework/module.
//It provides the set of features for building web and mobile applications.
const express = require("express");

//This line imports the node.js path module.
//It provide utilities for working/manipulating with file and directory paths.
const path = require("path");

//This line creates an instance of express application.
//It is use to configure routes, middleware and other setting for your web application.
const app = express();

//It loads the bodyparser middleware for express.js so you can parse inccoming request bodies.
const bodyParser = require("body-parser");

//This line imports the sequelize instance from the specefied file path.
//It is configured instance of sequelize-ORM which provide the easy access to database via Javascript objects.
const sequelize = require("./utils/database");

//This line defines the absolute path to the public directory to serve the static files.
//It construts the absolute path to the public directoy by joining the current directory relative path.
const publicPath = path.join(\_\_dirname, "../FrontEnd/public");

//Middleware in express.js are a function that have access to the request and response object.
//Middleware functions can perform tasks such as:
//Execute any code.
//Make changes to the request and response objects.
//End the HTTP request-response cycle.
//Call the next middleware function in the stack.

//This line set up the middleware
//Here body.parser is a middleware function which is responsible for parsing the json body incoming request.
app.use(bodyParser.json());

//express.static is inbuilt middleware function in express.js.
//It serves the static files(Html/Css/Js) from the specefied public directory.
app.use(express.static(publicPath));

//This line imports the commonRoutefile, which likely to be contain routeHandler i.e. routefunctions/methods for commonRoutes
const commonRoutes = require("./routes/commonRoute");

//This line is used to mount the commonRoutes middleware under the path /mingleglobe.
//app.use("/mingleglobe", commonRoutes) tells Express to use the commonRoutes middleware for any requests that start with '/mingleglobe'.
app.use("/mingleglobe", commonRoutes);

const PORT = process.env.PORT || 3000;

//This line synchronize the sequelize models with database.
//.sync() is a sequelize method that creates database tables based on your defined models.
//It creates/updates the tables based on the defined sequelize models.

sequelize
.sync()
.then(() =>

//This line starts the Express server, listening on the specified port.
//When the server start listening on the specified port, the call back function executes, which in this case prints the server is running on port.
app.listen(PORT, () => {
print the port number on which server listens
console.log(`Server is running on port ${PORT}`);
})
)
.catch((err) => console.log(err));
