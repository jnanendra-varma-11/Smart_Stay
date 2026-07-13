const express = require("express");
const router = express.Router();

const {
    addReview,
    getHotelReviews,
    getRoomReviews,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

// =====================================
// User Routes
// =====================================

// Add Review
router.post(
    "/",
    protect,
    addReview
);

// Update Review
router.put(
    "/:id",
    protect,
    updateReview
);

// Delete Review
router.delete(
    "/:id",
    protect,
    deleteReview
);

// =====================================
// Public Routes
// =====================================

// Get Reviews of a Hotel
router.get(
    "/hotel/:hotelId",
    getHotelReviews
);

// Get Reviews of a Room
router.get(
    "/room/:roomId",
    getRoomReviews
);

module.exports = router;