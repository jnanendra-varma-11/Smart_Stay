const AdminRequest = require("../models/AdminRequest");
const User = require("../models/User");

// =======================================
// Submit Admin Request
// =======================================

const submitAdminRequest = async (req, res) => {

    try {

        const {
            businessName,
            phone,
            address,
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found.",
            });

        }

        // Only normal users can submit requests

        if (user.role !== "user") {

            return res.status(400).json({
                message: "Only normal users can submit an admin request.",
            });

        }

        const existingRequest = await AdminRequest.findOne({

            user: req.user.id,

            status: {
                $in: ["Pending", "Approved"],
            },

        });

        if (existingRequest) {

            return res.status(400).json({

                message:
                    existingRequest.status === "Pending"
                        ? "Your admin request is already pending."
                        : "You have already been approved as an admin.",

            });

        }

        const request = await AdminRequest.create({

            user: req.user.id,

            businessName,

            phone,

            address,

        });

        res.status(201).json({

            message: "Admin request submitted successfully.",

            request,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =======================================
// Get Pending Requests
// =======================================

const getPendingRequests = async (req, res) => {

    try {

        const requests = await AdminRequest.find({

            status: "Pending",

        }).populate(

            "user",

            "name email"

        );

        res.status(200).json(requests);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =======================================
// Approve Request
// =======================================

const approveRequest = async (req, res) => {

    try {

        const { id } = req.params;

        const request = await AdminRequest.findById(id);

        if (!request) {

            return res.status(404).json({

                message: "Request not found.",

            });

        }

        if (request.status !== "Pending") {

            return res.status(400).json({

                message: "Request has already been processed.",

            });

        }

        const user = await User.findById(request.user);

        if (!user) {

            return res.status(404).json({

                message: "User not found.",

            });

        }

        if (user.role !== "user") {

            return res.status(400).json({

                message: "This user cannot be promoted.",

            });

        }

        user.role = "admin";

        user.businessName = request.businessName;

        user.phone = request.phone;

        user.address = request.address;

        await user.save();

        request.status = "Approved";

        request.reviewedBy = req.user.id;

        request.reviewedAt = new Date();

        await request.save();

        res.status(200).json({

            message: "Admin request approved successfully.",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =======================================
// Reject Request
// =======================================

const rejectRequest = async (req, res) => {

    try {

        const { id } = req.params;

        const request = await AdminRequest.findById(id);

        if (!request) {

            return res.status(404).json({

                message: "Request not found.",

            });

        }

        if (request.status !== "Pending") {

            return res.status(400).json({

                message: "Request has already been processed.",

            });

        }

        request.status = "Rejected";

        request.reviewedBy = req.user.id;

        request.reviewedAt = new Date();

        await request.save();

        res.status(200).json({

            message: "Admin request rejected successfully.",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

module.exports = {

    submitAdminRequest,

    getPendingRequests,

    approveRequest,

    rejectRequest,

};