const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db = require('./db')
const port = 4545 //Can be process.env.PORT in production

//Configuration is defined in .env file
require('dotenv').config()

const app = express()

app.use(cors())//CORS is required else requests from different domains will be rejected

app.use(express.json()) //To use req.body we need this middleware

const reportRoute = require("./routes/report") //Express router is used. This is one route. Can be many

app.use("/report", reportRoute)


//Making the server
app.listen(port, async () => {
    await db.connect();//Connecting to mongodb
});