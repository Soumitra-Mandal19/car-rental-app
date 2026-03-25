const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// const db = require('./config/db');
// const bcrypt = require('bcrypt')

const { HomeResponse, TestResponse } = require('./controllers/authController');


const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", HomeResponse)

app.post("/test", TestResponse);

// Auth routes
app.use(authRoutes);

// Car routes
app.use(carRoutes);

// Booking routes
app.use(bookingRoutes);

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
    
})