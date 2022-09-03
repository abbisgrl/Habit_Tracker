const mongoose = require('mongoose');
 
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

const Habit = mongoose.model('Habit',schemaHabit);
module.exports = Habit;