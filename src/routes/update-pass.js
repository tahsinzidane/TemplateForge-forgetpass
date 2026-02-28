const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt")

router.put("/api/update-password",auth, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        message: "email and password required for this action"
    });


    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const updateUser = await Users.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        )

        return res.status(200).json({
            message: "password has been update for user ",
            email
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})
module.exports = router;