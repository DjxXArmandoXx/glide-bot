const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  serverid: {
    type: String,
    required: true
 },
 channelid: {
    type: String,
    required: true
 }

}); 

module.exports = mongoose.model('ticket', schema);