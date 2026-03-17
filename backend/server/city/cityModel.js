const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    cityName: { type: String, default: null },
    pinCode: { type: String, default: null },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("city",citySchema)