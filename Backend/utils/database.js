// * Sequelize is used for configuring the Sequelize library and managing the database connection,
// * while DataTypes is used for defining attribute data types when creating Sequelize models.
// * Both are essential components of working with Sequelize in Node.js applications..

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("socialmedia_app", "root", "Rahul@6160", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
