const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    serverid: {
        type: String,
        required: true
    },
    servername: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    yearBirth: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }


}) 

module.exports = mongoose.model('register', schema);