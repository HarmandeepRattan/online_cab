const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    userType: { type: Number, default: 2 }, //Admin-1, Customer-2,
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model("users",userSchema)