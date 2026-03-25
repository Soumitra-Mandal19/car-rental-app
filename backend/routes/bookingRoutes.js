const express = require('express');
const router = express.Router();

// Import Controller
const {rentCar, getAgencyBookings} = require('../controllers/bookingContoller');

// Import auth middleware
const authMiddleware = require('../middleware/authMiddleware');

// Only logged in customer can rent cars
router.post('/api/bookings', authMiddleware, rentCar);

// Get all bookings for agency
router.get('/api/agency/bookings', authMiddleware, getAgencyBookings);

module.exports = router;