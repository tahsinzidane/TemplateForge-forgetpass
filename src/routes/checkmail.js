const express = require("express");
const router = express.Router();
const User = require("../models/users");
const otp = require("../config/gen-otp"); //genearte otp
const Otp = require("../models/otp"); // store on db

// Check db for the target email
router.post("/api/users/check-email", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email })
        if (user) {
            // console.log("otp sent", email, otp)
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

            return res.json({ exists: true, message: "Email is registered" })
        } else {
            return res.json({ exists: false, message: "Email not found" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" })
    }
})

module.exports = router