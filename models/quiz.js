const { Schema, model } = require("mongoose");

let today =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

const userChema = new Schema({
    testType: { type: String },
    amaliy: { type: String },
    question: { type: String },
    mockAnswer: { type: Object },
    answer: { type: String },
    teacherGroup: { type: String },
    createDay: { type: String, default: today }
})

const Quiz = model("Quiz", userChema);
module.exports = Quiz;
