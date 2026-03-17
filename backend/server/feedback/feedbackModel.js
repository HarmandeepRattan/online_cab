const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "bookings" },
    feedbackDescription: { type: String, default: null },
    rating: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("feedbacks",feedbackSchema)