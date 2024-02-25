const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('comment', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
});

module.exports = Comment;
