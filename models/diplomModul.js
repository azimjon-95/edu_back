const mongoose = require('mongoose');

const ENG = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    other: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    givenDate: {
        type: String,
        required: true
    },
    prosent: {
        type: Number,
    }
})

const model = mongoose.model("ENG", ENG);
module.exports = model;