const express = require('express');
const router = express.Router();


// import the authController functions 

const {registerUser, loginUser} = require("../controllers/authController");

// register route
router.post('/api/auth/register', registerUser);

// login route
router.post("/api/auth/login", loginUser);

module.exports = router;