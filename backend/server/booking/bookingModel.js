const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Brand" },
    carId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "cars" },
    priceId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "prices" },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "users" },
    bookingRate: { type: Number, default: null },
    bookingDate: { type: Date, default: null },
    pickupAddress:{ type:String, default:null},
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now() },

})

module.exports = new mongoose.model("bookings",bookingSchema)