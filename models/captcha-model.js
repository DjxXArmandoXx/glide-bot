const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  guildid: {
      type: String,
      required: true,
  },
  channel: {
      type: String,
      required: true,
  },
  roleid: {
    type: String,
    required: true,
  }
}); 

module.exports = mongoose.model('captcha', schema);