const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    contact: { type: Number, default: null },
    address: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null , ref:'users' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model("customers",customerSchema)