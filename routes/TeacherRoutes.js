const { Router } = require("express");
const teacher = Router();
const {
    createTeacher,
    getTeacher,
    deleteTeacher,
    updateTeacher,
} = require("../controls/Teacher");
teacher.post("/createTeacher", createTeacher);
teacher.get("/getTeacher", getTeacher);
teacher.delete("/deleteTeacher/:_id", deleteTeacher);
teacher.put("/updateTeacher/:id", updateTeacher);
module.exports = teacher;