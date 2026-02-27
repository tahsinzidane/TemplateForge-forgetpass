const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.APP_PASS,
    }
});
module.exports = transporter;