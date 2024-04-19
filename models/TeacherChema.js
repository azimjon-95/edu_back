const { Schema, model } = require("mongoose");

const userChema = new Schema({
    typeWorker: { type: String },
    idNumber: { type: String, require: [true, "ID number is required!"] },
    username: { type: String, require: [true, "Username is required!"] },
    password: { type: String, require: [true, "Password is required!"] },
    firstname: { type: String, require: [true, "Firstname is required!"] },
    lastname: { type: String, require: [true, "Lastname is required!"] },
    phone: { type: String },
    address: { type: String },
    birthday: { type: String, require: [true, "Birthday is required!"] },
    salary: { type: Number },
    science: { type: Object }
})

const Teacher = model("teacher", userChema);
module.exports = Teacher;
