const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
    try {
        // 1. get token from headers
        const authHeader = req.headers['authorization'];
        if(!authHeader) {
            return res.status(401).json({message: "No token provided"})
        }

        //2. Bearer <token>
        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: "Invalid token format"})
        }

        //3. verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //4. set user info on request
        //We save the decoded user info in req.user
        //*******This makes it available in controllers*****
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        //5. Call next to procees to controller
        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;