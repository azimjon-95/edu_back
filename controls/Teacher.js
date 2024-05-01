const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Teacher = require('../models/TeacherChema');
// ------------Teacher Malumotlarini Olish--------------------
const getTeacher = async (req, res) => {
    try {
        const allData = await Teacher.find();
        res.json({
            success: true,
            massage: "Teacher malumotlarni muvaffaqiyatli olib kelindi",
            data: allData,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
            massage: "Teacher malumotlarni olishda xatolik yuz berdi!",
        })
    }
}
const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const teacher = await Teacher.findOne({ username });

        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid!",
            });
        }

        const passwordMatch = await bcrypt.compare(password, teacher.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid!",
            });
        }

        const token = jwt.sign({ username: user.username }, "secret");
        return res.status(200).json({
            success: true,
            message: "Sign in successful!",
            token: token
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Server error: An error occurred during the login process." });
    }
};

// ------------------Teacher Malumotlarini Qoshish---------------------
const createTeacher = async (req, res) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            phone,
            address,
            birthday,


        } = req.body;

        const existingUser = await Teacher.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud."
            });
        } else {


            const newUser = new Teacher({
                username,
                password,
                firstname,
                lastname,
                phone,
                address,
                birthday,



            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Teacher: Malumotlaringiz muvaffaqiyatli qo'shildi"
            });
        }
    } catch (error) {

        console.error("Xato:", error);
        return res.status(500).json({ success: false, message: "Server xatosi:Direktor malumot qabul qilishda xatolik yuz berdi" });
    }
};
// --------------Teacher Malumotlarini O'chirish----------------------------
const deleteTeacher = async (req, res) => {
    try {
        let deleted = await Teacher.findByIdAndDelete(req.params._id);

        if (!deleted) {
            return res.json({
                success: false,
                message: "Teacher Is not Deleted!",
            })
        }
        res.json({
            success: true,
            message: "Teacher is Deleted!",
            innerData: deleted
        })
    } catch (error) {
        res.json({ success: false, message: error, })
    }
}
// --------------------------Teacher Malumotlarini Ozgartirish-----------------------
const updateTeacher = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await Teacher.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "Teacher malumoti topilmadi",
            });
        }

        res.json({
            success: true,
            message: "TeaTeacher malumoti muvaffaqiyatli yangilandi",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Ichki server xatosi" });
    }
}
module.exports = {
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher,
    postLogin
}