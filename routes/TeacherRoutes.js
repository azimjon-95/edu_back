const { Router } = require("express");
const teacher = Router();
const {
    createTeacher,
    getTeacher,
    deleteTeacher,
    updateTeacher,
    postLogin
} = require("../controls/Teacher");
teacher.post("/createTeacher", createTeacher);
teacher.post("/postLogin", postLogin);
teacher.get("/getTeacher", getTeacher);
teacher.delete("/deleteTeacher/:_id", deleteTeacher);
teacher.put("/updateTeacher/:id", updateTeacher);
module.exports = teacher;