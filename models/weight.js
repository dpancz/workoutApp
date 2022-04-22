const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    weightNumber: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;