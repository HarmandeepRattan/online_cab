const mongoose = require("mongoose")

const carSachema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Brand" },
    carName: { type: String, default: null },
    carModel: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: null },
    carImage: { type: String, default: "car/no_image.jpg" },
    status: { type: Boolean, default: true },
    created: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("cars",carSachema)