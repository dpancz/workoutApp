const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    workout: {
        type: Object,
        required: true
    },
    time: {
        type: Object,
        required: true
    },
    workoutName:{
        type: String,
        required: true,
    },
    workoutColor: {
        type: String,
        required: true,
    },
    workoutDate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;