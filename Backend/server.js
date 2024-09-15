const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db');
const app = express();
const cors = require('cors');
require("dotenv").config();

//import Routes
const userRouter = require("./routes/userRouter");
const candidateRouter = require("./routes/candidateRouter");

app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;


app.use("/user", userRouter);
app.use("/candidate", candidateRouter);

app.listen(PORT, () => {
    console.log("listening on port 3000")
})