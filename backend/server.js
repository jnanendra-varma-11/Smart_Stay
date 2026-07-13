require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRequestRoutes = require("./routes/adminRequestRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// ===========================
// Connect Database
// ===========================

connectDB();

// ===========================
// Middlewares
// ===========================

app.use(cors());

app.use(express.json());
app.use("/api/reviews", reviewRoutes);
// ===========================
// Routes
// ===========================

app.use("/api/users", userRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin-requests", adminRequestRoutes);

// ===========================
// Home Route
// ===========================

app.get("/", (req, res) => {

    res.send("Welcome to SmartStay Backend");

});

// ===========================
// Start Server
// ===========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});