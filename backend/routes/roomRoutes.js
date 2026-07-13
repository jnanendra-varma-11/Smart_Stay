const express = require("express");
const router = express.Router();

const {
    addRoom,
    getRooms,
    getRoomsByHotel,
    updateRoom,
    deleteRoom,
    getMyRooms,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// =====================
// Public Routes
// =====================

// Get all rooms
router.get("/", getRooms);

router.get("/my-rooms",protect, adminOnly, getMyRooms);

// Get all rooms of a particular hotel
router.get("/hotel/:hotelId", getRoomsByHotel);

// =====================
// Admin Routes
// =====================

// Add room
router.post("/", protect, adminOnly, addRoom);

// Update room
router.put("/:id", protect, adminOnly, updateRoom);

// Delete room
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;