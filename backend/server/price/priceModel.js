const mongoose = require("mongoose")

const priceSchema = new mongoose.Schema({
    startPointCityId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "city" },
    endPointCityId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "city" },
    price: { type: Number, default: null },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("prices", priceSchema)
