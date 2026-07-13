const Review = require("../models/Review");
const Booking = require("../models/Booking");

// =====================================
// Add Review
// =====================================

const addReview = async (req, res) => {

    try {

        const {
            bookingId,
            rating,
            comment,
        } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found.",
            });

        }

        if (booking.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized.",
            });

        }

        if (booking.status === "Cancelled") {

            return res.status(400).json({
                message: "Cancelled bookings cannot be reviewed.",
            });

        }

        if (new Date() < new Date(booking.checkOut)) {

            return res.status(400).json({
                message: "You can review only after your stay is completed.",
            });

        }

        const existingReview = await Review.findOne({
            booking: bookingId,
        });

        if (existingReview) {

            return res.status(400).json({
                message: "You have already reviewed this booking.",
            });

        }

        const review = await Review.create({

            user: req.user.id,

            booking: booking._id,

            hotel: booking.hotel,

            room: booking.room,

            rating,

            comment,

        });

        res.status(201).json({

            message: "Review added successfully.",

            review,

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// =====================================
// Get Reviews By Hotel
// =====================================

// =====================================
// Get Reviews By Hotel
// =====================================

const getHotelReviews = async (req, res) => {

    try {

        const { hotelId } = req.params;

        const reviews = await Review.find({

            hotel: hotelId,

        })
        .populate("user", "name")
        .sort({
            createdAt: -1,
        });

        let averageRating = 0;

        if (reviews.length > 0) {

            const totalRating = reviews.reduce(

                (sum, review) => sum + review.rating,

                0

            );

            averageRating = Number(

                (totalRating / reviews.length).toFixed(1)

            );

        }

        res.status(200).json({

            averageRating,

            totalReviews: reviews.length,

            reviews,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =====================================
// Get Reviews By Room
// =====================================

const getRoomReviews = async (req, res) => {

    try {

        const { roomId } = req.params;

        const reviews = await Review.find({
            room: roomId,
        })
        .populate("user", "name")
        .sort({
            createdAt: -1,
        });

        res.status(200).json(reviews);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// =====================================
// Update Review
// =====================================

const updateReview = async (req, res) => {

    try {

        const { id } = req.params;

        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {

            return res.status(404).json({
                message: "Review not found.",
            });

        }

        if (review.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized.",
            });

        }

        review.rating = rating;

        review.comment = comment;

        await review.save();

        res.status(200).json({

            message: "Review updated successfully.",

            review,

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// =====================================
// Delete Review
// =====================================

const deleteReview = async (req, res) => {

    try {

        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {

            return res.status(404).json({
                message: "Review not found.",
            });

        }

        if (review.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized.",
            });

        }

        await Review.findByIdAndDelete(id);

        res.status(200).json({
            message: "Review deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {

    addReview,

    getHotelReviews,

    getRoomReviews,

    updateReview,

    deleteReview,

};