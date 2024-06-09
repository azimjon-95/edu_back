const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

async function connectToDb() {
    await connect(process.env.DB_CONNECTION)
        .then(() => console.log("MongoDB is connected"))
        .catch((err) => console.log("MongoDB is not connected", err));
}
connectToDb();

const userRoutes = require("./routes/user");
const loginRoute = require("./routes/loginroute");
const certificate = require('./routes/certificate');
// Router import

app.use('/user', userRoutes);
app.use('/auth', loginRoute);
app.use("/certificate", certificate);


app.get("/", async (req, res) => res.json("App is running"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    // Use server.listen instead of app.listen
    console.log(`Server listening => http://localhost:${PORT}`)
);

