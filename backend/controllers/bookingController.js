const Booking = require("../models/Booking");
const Room = require("../models/Room");

// ==============================
// Book Room
// ==============================

const bookRoom = async (req, res) => {

    try {

        const {
            room,
            checkIn,
            checkOut,
        } = req.body;

        const selectedRoom = await Room.findById(room).populate("hotel");

        if (!selectedRoom) {

            return res.status(404).json({
                message: "Room not found",
            });

        }

        const newCheckIn = new Date(checkIn);
        const newCheckOut = new Date(checkOut);

        if (newCheckIn >= newCheckOut) {

            return res.status(400).json({
                message: "Check-out date must be after check-in date.",
            });

        }

        // Check overlapping bookings
        const existingBooking = await Booking.findOne({

            room,

            status: {
                $ne: "Cancelled",
            },

            checkIn: {
                $lt: newCheckOut,
            },

            checkOut: {
                $gt: newCheckIn,
            },

        });

        if (existingBooking) {

            return res.status(400).json({
                message: "Room is already booked for the selected dates.",
            });

        }

        // Calculate number of days
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const numberOfDays = Math.ceil(
            (newCheckOut - newCheckIn) / millisecondsPerDay
        );

        if (numberOfDays <= 0) {

            return res.status(400).json({
                message: "Invalid booking dates.",
            });

        }

        // Calculate total price
        const totalPrice = numberOfDays * selectedRoom.price;

        // Create booking
        const booking = await Booking.create({

            user: req.user.id,

            hotel: selectedRoom.hotel._id,

            room: selectedRoom._id,

            checkIn: newCheckIn,

            checkOut: newCheckOut,

            totalPrice,

            status: "Booked",

        });

        res.status(201).json({

            message: "Room Booked Successfully",

            booking,

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ==============================
// Get My Bookings
// ==============================

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            user: req.user.id,

        })
            .populate("hotel")
            .populate("room");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ==============================
// Cancel Booking
// ==============================

const cancelBooking = async (req, res) => {

    try {

        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found",
            });

        }

        if (booking.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized to cancel this booking.",
            });

        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({

            message: "Booking Cancelled Successfully",

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {

    bookRoom,

    getMyBookings,

    cancelBooking,

};