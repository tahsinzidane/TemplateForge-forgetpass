const express = require("express");
const router = express.Router();
const User = require("../models/users");
const otp = require("../config/gen-otp"); //genearte otp
const Otp = require("../models/otp"); // store on db
const nodemailer = require('nodemailer');
const transporter = require("../config/mailer");


let mailOptions;
// Configure the mailoptions object
const sendCode = async (otp, email) => {
    mailOptions = {
        from: 'bmtahsin3269@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`
    };
    return mailOptions
}

// Check db for the target email
router.post("/api/users/check-email", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email })
        if (user) {
            // console.log("otp sent", email, otp)
            sendCode(otp, email);
            // console.log(mailOptions);
            const newOtp = new Otp({
                otp: otp,
                email: email
            })

            try {
                const resutl = newOtp.save();
                console.log("otp and mail inserted successfully");
            } catch (error) {
                console.error('Error inserting document:', error.message);
            }

            // send otp
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Error:", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.json({ exists: true, message: "Email is registered" })
        } else {
            return res.json({ exists: false, message: "Email not found" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" })
    }
})

module.exports = router;