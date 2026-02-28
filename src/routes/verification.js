const express = require("express");
const router = express.Router();
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// otp verification
router.post("/api/verification", async (req, res) => {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ message: "Otp is required" });

    try {
        const checkOtp = await Otp.findOne({ otp })
        if (!checkOtp) {
            return res.status(404).json({
                exists: false,
                message: "invalid otp"
            })
        }
        const token = jwt.sign(
            {id: checkOtp._id},
            process.env.JWT_SECRET,
            {expiresIn: "5m"}
        )
        return res.json({
            exists: true,
            message: "Otp valid 👍",
            token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
});
module.exports = router;