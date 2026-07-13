const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    becomeAdmin,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// ==========================
// Public Routes
// ==========================

router.post("/register", registerUser);

router.post("/login", loginUser);

// ==========================
// Protected Routes
// ==========================

router.put(
    "/become-admin",
    protect,
    becomeAdmin
);

module.exports = router;