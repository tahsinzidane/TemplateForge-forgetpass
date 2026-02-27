const express = require("express");
const router = express.Router();
const Otp = require("../models/otp");

// otp verification
router.post("/api/verification", async (req, res) => {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ message: "Otp is required" });

    try {
        const checkOtp = await Otp.findOne({ otp })
        return res.json({ exists: true, message: "Otp valid 👍" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
});
module.exports = router;