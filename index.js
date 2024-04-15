const express = require("express");
const { connect } = require("mongoose")
const cors = require("cors");

require("dotenv").config();

const app = express()
app.use(express.json());

app.use(cors())

// ---Data-Base---
async function connectToDB() {
    await connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDb is connect"))
        .catch(() => console.log("MogoDb is not connected"))
}

connectToDB();

app.get("/", (req, res) => {
    res.json("Salom Node.js")
})
const user = require('./routes/userRoutes');

const teacher = require('./routes/TeacherRoutes');
const quiz = require('./routes/Quiz')

app.use('/edu', user, teacher, quiz);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} portda ishga tushdi!`);
})