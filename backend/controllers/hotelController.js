const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// ==========================
// Add Hotel
// ==========================

const addHotel = async (req, res) => {

    try {

        const {
            name,
            location,
            description,
            startingPrice,
            images,
            amenities,
        } = req.body;

        const hotel = await Hotel.create({

            name,
            location,
            description,
            startingPrice,
            images,
            amenities,
            createdBy: req.user.id,

        });

        res.status(201).json({

            message: "Hotel Added Successfully",

            hotel,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Hotels (Public)
// ==========================

const getHotels = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        let sortOption = {};

        switch (req.query.sort) {

            case "price_asc":
                sortOption = { startingPrice: 1 };
                break;

            case "price_desc":
                sortOption = { startingPrice: -1 };
                break;

            case "newest":
                sortOption = { createdAt: -1 };
                break;

            default:
                sortOption = { createdAt: -1 };

        }

        const totalHotels = await Hotel.countDocuments();

        const hotels = await Hotel.find()
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({

            totalHotels,

            currentPage: page,

            totalPages: Math.ceil(totalHotels / limit),

            hotels,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Hotel By ID
// ==========================

const getHotelById = async (req, res) => {

    try {

        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {

            return res.status(404).json({

                message: "Hotel not found",

            });

        }

        const rooms = await Room.find({

            hotel: id,

        });

        res.status(200).json({

            hotel,

            rooms,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Hotel
// ==========================

const updateHotel = async (req, res) => {

    try {

        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {

            return res.status(404).json({

                message: "Hotel not found",

            });

        }

        if (hotel.createdBy.toString() !== req.user.id) {

            return res.status(403).json({

                message: "You are not authorized to update this hotel.",

            });

        }

        const updatedHotel = await Hotel.findByIdAndUpdate(

            id,

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        res.status(200).json({

            message: "Hotel Updated Successfully",

            hotel: updatedHotel,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Hotel
// ==========================

const deleteHotel = async (req, res) => {

    try {

        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {

            return res.status(404).json({

                message: "Hotel not found",

            });

        }

        if (hotel.createdBy.toString() !== req.user.id) {

            return res.status(403).json({

                message: "You are not authorized to delete this hotel.",

            });

        }

        const rooms = await Room.find({

            hotel: id,

        });

        if (rooms.length > 0) {

            return res.status(400).json({

                message: "Delete all rooms before deleting the hotel.",

            });

        }

        await Hotel.findByIdAndDelete(id);

        res.status(200).json({

            message: "Hotel Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Search Hotels
// ==========================

const searchHotels = async (req, res) => {

    try {

        const { name } = req.query;

        const hotels = await Hotel.find({

            name: {

                $regex: name,

                $options: "i",

            },

        });

        res.status(200).json(hotels);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Filter Hotels
// ==========================

const filterHotels = async (req, res) => {

    try {

        const {

            location,

            minPrice,

            maxPrice,

            amenity,

        } = req.query;

        let filter = {};

        if (location) {

            filter.location = {

                $regex: location,

                $options: "i",

            };

        }

        if (minPrice || maxPrice) {

            filter.startingPrice = {};

            if (minPrice) filter.startingPrice.$gte = Number(minPrice);

            if (maxPrice) filter.startingPrice.$lte = Number(maxPrice);

        }

        if (amenity) {

            filter.amenities = amenity;

        }

        const hotels = await Hotel.find(filter);

        res.status(200).json(hotels);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get My Hotels (Admin)
// ==========================

const getMyHotels = async (req, res) => {

    try {

        const hotels = await Hotel.find({

            createdBy: req.user.id,

        }).sort({

            createdAt: -1,

        });

        res.status(200).json(hotels);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

module.exports = {

    addHotel,

    getHotels,

    getHotelById,

    updateHotel,

    deleteHotel,

    searchHotels,

    filterHotels,

    getMyHotels,

};