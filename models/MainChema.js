const { Schema, model } = require("mongoose");

const userChema = new Schema({
    username: { type: String, require: [true, "Username is required!"] },
    password: { type: String, require: [true, "Password is required!"] },
    firstname: { type: String, require: [true, "Firstname is required!"] },
    lastname: { type: String, require: [true, "Lastname is required!"] },
    phone: { type: String, require: [true, "Phone is required!"] },
    address: { type: String, require: [true, "Address is required!"] },
    birthday: { type: String, require: [true, "Birthday is required!"] },
    email: { type: String, require: [true, "Email is required!"] },
    idNumber: { type: String, require: [true, "IdNumber is required!"] },
    worKexperience: { type: String, require: [true, "Ish Tajribasi is required!"] },
    briefSelfDescription: { type: String, require: [true, "O'z haqida qisqacha is required!"] },

})
const Main = model("main", userChema);
module.exports = Main;