const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userChema');
// -------------Student Malumotlarini Olish--------------------
const getData = async (req, res) => {
    try {
        const allData = await User.find();
        res.json({
            success: true,
            massage: "Student malumotlarni muvaffaqiyatli olib kelindi",
            data: allData,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
            massage: "Foydalanuvchini olishda xatolik yuz berdi",
        })
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid!",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
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
// ------------------Student Malumotlarini Qoshish---------------------
const createUser = async (req, res) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            phone,
            address,
            birthday,
            fathersFullname,
            mathersFullname,
            fathersPhone,
            mathersPhone,
            TimeToStartStudying,
            coins,
            Science,
        } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud."
            });
        } else {


            const newUser = new User({
                username,
                password,
                firstname,
                lastname,
                phone,
                address,
                birthday,
                fathersFullname,
                mathersFullname,
                fathersPhone,
                mathersPhone,
                TimeToStartStudying,
                coins,
                Science,

            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi."
            });
        }
    } catch (error) {

        console.error("Xato:", error);
        return res.status(500).json({ success: false, message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi." });
    }
};
// --------------Student Malumotlarini O'chirish----------------------------
const deleteUser = async (req, res) => {
    try {
        let deleted = await User.findByIdAndDelete(req.params._id);

        if (!deleted) {
            return res.json({
                success: false,
                message: "User is not deleted!",
            })
        }
        res.json({
            success: true,
            message: "User is deleted!",
            innerData: deleted
        })
    } catch (error) {
        res.json({ success: false, message: error, })
    }
}
// --------------------------Student Malumotlarini Ozgartirish-----------------------
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "Foydalanuvchi topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Foydalanuvchi muvaffaqiyatli yangilandi",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Ichki server xatosi" });
    }
}
module.exports = {
    createUser,
    getData,
    deleteUser,
    updateUser,
    postLogin
}