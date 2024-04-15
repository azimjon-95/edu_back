const { Router } = require("express");
const user = Router();
const {
    createUser,
    getData,
    deleteUser,
    updateUser,
} = require("../controls/Users");
user.post("/createUser", createUser);
user.get("/getData", getData);
user.delete("/deleteUser/:_id", deleteUser);
user.put("/updateUser/:id", updateUser);
module.exports = user;