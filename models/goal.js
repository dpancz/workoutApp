const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    goal: {
        type: Object,
        required: true,
    },
    goalType: {
        type: String,
        required: true,
    },
    done: {
        type: String,
        default: false,
        required: true,
    },
    doneData: {
        type: Object,
        default: {},
        required: true
    }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;