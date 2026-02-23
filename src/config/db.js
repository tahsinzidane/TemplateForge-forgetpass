const mongoose = require("mongoose");
require("dotenv").config();

const dbString = process.env.DB_STRING
const connectDB = mongoose.connect(dbString)
    .then(() => {
        console.log("mongodb connected")
    }).catch((error) => {
        console.error("mongodb connection error : ", error);
    })
module.exports = connectDB;    