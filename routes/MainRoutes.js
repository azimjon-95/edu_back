const { Router } = require("express");
const main = Router();
const {
    getMain,
    createMain,
    deleteMain,
    updateMain,
} = require("../controls/Main");
main.post("/createMain", createMain);
main.get("/getMain", getMain);
main.delete("/deleteMain/:_id", deleteMain);
main.put("/updateMain/:id", updateMain);
module.exports = main;