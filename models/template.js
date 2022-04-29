const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    templateName: {
        type: String,
        required: true
    },
    workout: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);
module.exports = Template