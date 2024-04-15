const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Quiz = require('../models/quiz');

// -------------Direktor Malumotlarini Olish--------------------
const getQuiz = async (req, res) => {
    try {
        const allData = await Quiz.find();
        res.json({
            success: true,
            massage: "Quizning malumotlarni muvaffaqiyatli olib kelindi",
            data: allData,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
            massage: "Quiz malumotlarni olishda xatolik yuz berdi!",
        })
    }
}
// ------------------Quiz Malumotlarini Qoshish---------------------
const createQuiz = async (req, res) => {
    try {
        const { amaliy, question } = req.body;

        const existingUser = await Quiz.findOne({ amaliy, question });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bunday Quiz qoowilgan"
            });
        } else {

            const newUser = new Quiz(req.body);
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Quiz: Malumotlaringiz muvaffaqiyatli qo'shildi"
            });
        }
    } catch (error) {

        console.error("Xato:", error);
        return res.status(500).json({ success: false, message: "Server xatosi:Quiz malumot qabul qilishda xatolik yuz berdi" });
    }
};
// --------------Quiz Malumotlarini O'chirish----------------------------
const deleteQuiz = async (req, res) => {
    try {
        let deleted = await Quiz.findByIdAndDelete(req.params._id);

        if (!deleted) {
            return res.json({
                success: false,
                message: "Quiz Is not Deleted!",
            })
        }
        res.json({
            success: true,
            message: "Quiz is Deleted!",
            innerData: deleted
        })
    } catch (error) {
        res.json({ success: false, message: error, })
    }
}
// --------------------------Quiz Malumotlarini Ozgartirish-----------------------
const updateQuiz = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await Quiz.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "Quiz malumoti topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Quiz malumoti muvaffaqiyatli yangilandi",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Ichki server xatosi" });
    }
}
module.exports = {
    getQuiz,
    createQuiz,
    deleteQuiz,
    updateQuiz,
}