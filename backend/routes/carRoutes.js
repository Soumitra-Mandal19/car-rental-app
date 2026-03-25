const express = require('express');
const router = express.Router();

//import the carController finction

const {addNewCar, editCar, getAllCars} = require("../controllers/carController");

// import authMiddleware

const authMiddleware = require('../middleware/authMiddleware');

// Only agencies can add new cars

router.post("/api/cars", authMiddleware ,addNewCar);

// edit car agency only 

router.put('/api/cars/:id', authMiddleware, editCar);

// get all cars routes

router.get('/api/cars', getAllCars);

module.exports = router;

