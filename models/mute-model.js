const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    serverid: {
        type: String,
        required: true
    },
    rolemute: {
        type: String,
        required: true
    },
    users: {
        type: [Object],
        required: true
    }
});

module.exports = mongoose.model('mute', schema);