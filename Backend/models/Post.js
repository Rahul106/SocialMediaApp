const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');

const Post = sequelize.define('post', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  postLink: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  postDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
});

module.exports = Post;
