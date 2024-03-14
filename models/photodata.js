const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    required: true
  },
});

module.exports = mongoose.model('Photo', photoSchema);