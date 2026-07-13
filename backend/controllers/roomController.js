const Room = require("../models/Room");
const Booking = require("../models/Booking");

// ==========================
// Add Room
// ==========================

const addRoom = async (req, res) => {

    try {

        const {
            hotel,
            roomNumber,
            roomType,
            price,
            capacity,
        } = req.body;

        const room = await Room.create({

            hotel,
            roomNumber,
            roomType,
            price,
            capacity,
            createdBy: req.user.id,

        });

        res.status(201).json({

            message: "Room Added Successfully",

            room,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get All Rooms
// ==========================

const getRooms = async (req, res) => {

    try {

        const rooms = await Room.find()
            .populate("hotel")
            .populate("createdBy", "name email");

        res.status(200).json(rooms);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Rooms By Hotel
// ==========================

const getRoomsByHotel = async (req, res) => {

    try {

        const { hotelId } = req.params;

        const rooms = await Room.find({

            hotel: hotelId,

        });

        res.status(200).json(rooms);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Room
// ==========================

const updateRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const room = await Room.findById(id);

        if (!room) {

            return res.status(404).json({

                message: "Room not found",

            });

        }

        if (room.createdBy.toString() !== req.user.id) {

            return res.status(403).json({

                message: "You are not authorized to update this room.",

            });

        }

        const updatedRoom = await Room.findByIdAndUpdate(

            id,

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        res.status(200).json({

            message: "Room Updated Successfully",

            room: updatedRoom,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Room
// ==========================

const deleteRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const room = await Room.findById(id);

        if (!room) {

            return res.status(404).json({

                message: "Room not found",

            });

        }

        if (room.createdBy.toString() !== req.user.id) {

            return res.status(403).json({

                message: "You are not authorized to delete this room.",

            });

        }

        const activeBooking = await Booking.findOne({

            room: id,

            status: {

                $ne: "Cancelled",

            },

        });

        if (activeBooking) {

            return res.status(400).json({

                message: "Cannot delete this room because it has active bookings.",

            });

        }

        await Room.findByIdAndDelete(id);

        res.status(200).json({

            message: "Room Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};
// ==========================
// Get My Rooms (Admin)
// ==========================

const getMyRooms = async (req, res) => {

    try {

        const rooms = await Room.find({

            createdBy: req.user.id,

        })
            .populate("hotel")
            .sort({

                createdAt: -1,

            });

        res.status(200).json(rooms);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

module.exports = {

    addRoom,

    getRooms,

    getRoomsByHotel,

    updateRoom,

    deleteRoom,

    getMyRooms,

};