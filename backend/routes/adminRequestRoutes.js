const express = require("express");
const router = express.Router();

const {
    submitAdminRequest,
    getPendingRequests,
    approveRequest,
    rejectRequest,
} = require("../controllers/adminRequestController");

const protect = require("../middleware/authMiddleware");
const superAdminOnly = require("../middleware/superAdminMiddleware");
// ==========================================
// User Routes
// ==========================================

// Submit an admin request
router.post(
    "/",
    protect,
    submitAdminRequest
);

// ==========================================
// Super Admin Routes
// ==========================================

// View all pending requests
router.get(
    "/pending",
    protect,
    superAdminOnly,
    getPendingRequests
);

// Approve request
router.put(
    "/approve/:id",
    protect,
    superAdminOnly,
    approveRequest
);
// Reject request
router.put(
    "/reject/:id",
    protect,
    superAdminOnly,
    rejectRequest
);
module.exports = router;