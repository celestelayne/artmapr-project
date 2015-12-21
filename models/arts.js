  // Load Mongoose module
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  // Mongoose Schema definition
  var ArtSchema = new Schema({
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    medium: {
      type: String
    },
    title: {
      type: String
    }
  });

  // Mongoose model definition
  var Art = mongoose.model('Art', ArtSchema);

  // Interact with the loaded models
  module.exports = Art;
