const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    startingPrice: {
        type: Number,
        required: true,
    },

    images: [{
        type: String,
    }],

    amenities: [{
        type: String,
    }],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;