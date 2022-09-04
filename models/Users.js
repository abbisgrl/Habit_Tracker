const mongoose = require('mongoose');

//schema for collection of user with email,name,date 
const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    view: {
        type: String,
        default: 'daily'
    }
});

//setting the schemaUser as user model 
const User = mongoose.model('User',schemaUser);
module.exports = User;