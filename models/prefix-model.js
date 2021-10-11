const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  serverid: {
    type: String,
    required: true,
 },
  prefix: {
      type: String,
      required: true,
  }
}); 

module.exports = mongoose.model('prefixe', schema);