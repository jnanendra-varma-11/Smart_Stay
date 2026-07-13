const express = require("express");
const router = express.Router();

const {
    bookRoom,
    getMyBookings,
    cancelBooking,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

router.get("/my-bookings", protect, getMyBookings);

router.post("/", protect, bookRoom);

router.delete("/:bookingId", protect, cancelBooking);

module.exports = router;