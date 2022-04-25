const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true
    },
    dayMode: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    logged: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;