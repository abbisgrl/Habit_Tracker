
const mongoose = require('mongoose');

//schema for collection of habit with email,date,timestamp and favorite field
const schemaHabit= new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dates: [{
        date: String,
        complete: String
    }],
    favorite: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

//setting the schemaHabit as habit model 
const Habit = mongoose.model('Habit',schemaHabit);
module.exports = Habit;