const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp:{
        type: Number
    },
    email:{
        type: String
    },
}, {timestamps: true})
module.exports = mongoose.model("Otp", otpSchema);
