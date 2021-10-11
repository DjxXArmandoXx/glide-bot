const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  namelog: {
      type: String,
      required: true
  },
  mention: {
      type: String,
      required: true
  },
  guildId: {
      type: String,
      required: true
  },
  log: {
      type: Number,
      required: true
  }
}); 

module.exports = mongoose.model('localLogs', schema);