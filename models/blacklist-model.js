const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
 },
 reason: {
   type: String,
   required: true,
 }
}); 

module.exports = mongoose.model('blacklisted', schema);