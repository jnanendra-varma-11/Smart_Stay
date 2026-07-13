const express = require("express");

const adminOnly = require("../middleware/adminMiddleware");
const router = express.Router();

const {
    addHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
    searchHotels,
    filterHotels,
    getMyHotels,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");


router.get("/", getHotels);
router.get("/search", searchHotels);
router.get("/filter", filterHotels);
router.get("/my-hotels",protect,adminOnly,getMyHotels);
router.get("/:id", getHotelById);
router.post("/", protect, adminOnly, addHotel);
router.put("/:id", protect, adminOnly, updateHotel);
router.delete("/:id", protect, adminOnly, deleteHotel);
module.exports = router;
