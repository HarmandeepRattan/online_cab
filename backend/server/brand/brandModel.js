const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    brandName: { type: String, default: null },
    logo: { type: String, default: 'brand/NoImg.jpg' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("Brand",brandSchema)