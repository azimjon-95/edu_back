const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Main = require('../models/MainChema');

// -------------Direktor Malumotlarini Olish--------------------
const getMain = async (req, res) => {
    try {
        const allData = await Main.find();
        res.json({
            success: true,
            massage: "Direktorning malumotlarni muvaffaqiyatli olib kelindi",
            data: allData,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
            massage: "Direktor malumotlarni olishda xatolik yuz berdi!",
        })
    }
}
// ------------------Direktor Malumotlarini Qoshish---------------------
const createMain = async (req, res) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            phone,
            address,
            birthday,
            email,
            idNumber,
            worKexperience,
            briefSelfDescription

        } = req.body;

        const existingUser = await Main.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud."
            });
        } else {


            const newUser = new Main({
                username,
                password,
                firstname,
                lastname,
                phone,
                address,
                birthday,
                email,
                idNumber,
                worKexperience,
                briefSelfDescription


            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Direktor: Malumotlaringiz muvaffaqiyatli qo'shildi"
            });
        }
    } catch (error) {

        console.error("Xato:", error);
        return res.status(500).json({ success: false, message: "Server xatosi:Direktor malumot qabul qilishda xatolik yuz berdi" });
    }
};
// --------------Direktor Malumotlarini O'chirish----------------------------
const deleteMain = async (req, res) => {
    try {
        let deleted = await Main.findByIdAndDelete(req.params._id);

        if (!deleted) {
            return res.json({
                success: false,
                message: "Direktor Is not Deleted!",
            })
        }
        res.json({
            success: true,
            message: "Direktor is Deleted!",
            innerData: deleted
        })
    } catch (error) {
        res.json({ success: false, message: error, })
    }
}
// --------------------------Direktor Malumotlarini Ozgartirish-----------------------
const updateMain = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await Main.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "Direktor malumoti topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Direktor malumoti muvaffaqiyatli yangilandi",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Ichki server xatosi" });
    }
}
module.exports = {
    getMain,
    createMain,
    deleteMain,
    updateMain,
}