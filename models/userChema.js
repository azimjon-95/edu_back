const { Schema, model } = require("mongoose");
const userChema = new Schema({
    username: { type: String },
    password: { type: String },
    firstname: { type: String, require: [true, "Firstname is required!"] },
    lastname: { type: String, require: [true, "Lastname is required!"] },
    phone: { type: String, require: [true, "Phone is required!"] },
    address: { type: String },
    birthday: { type: String, require: [true, "Birthday is required!"] },
    fathersFullname: { type: String, require: ["FathersNumber is required!"] },
    mothersFullname: { type: String, require: ["MothersNumber is required!"] },
    fathersPhone: { type: String, require: ["fathersPhone is required!"] },
    mathersPhone: { type: String, require: ["mathersPhone is required!"] },
    TimeToStartStudying: { type: String, require: ["TimeToStartStudying is required!"] },
    coins: { type: String },
    Science: { type: String, require: ["Science is required!"] }
})
const User = model("user", userChema);
module.exports = User;

