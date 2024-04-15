const { Router } = require("express");
const quiz = Router();
const {
    getQuiz,
    createQuiz,
    deleteQuiz,
    updateQuiz,
} = require("../controls/quiz");

quiz.post("/createQuiz", createQuiz);
quiz.get("/getQuiz", getQuiz);
quiz.delete("/deleteQuiz/:_id", deleteQuiz);
quiz.put("/updateQuiz/:id", updateQuiz);

module.exports = quiz;