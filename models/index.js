  // Mongoose import
  var mongoose = require('mongoose');

  // Mongoose connection to MongoDB service (via connection string) on local computer
  mongoose.connect('mongodb://localhost/artmaprdb');

  module.exports.Art = require('./arts.js')
