const mysql = require('mysql2');
require('dotenv').config();
const fs = require('fs');


let sslOptions = undefined;

// Use certificate file if it exists
if (process.env.DB_CERT_PATH && fs.existsSync(process.env.DB_CERT_PATH)) {
    sslOptions = {
        ca: fs.readFileSync(process.env.DB_CERT_PATH)
    };
}

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: sslOptions
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("Error in connection with DB:", err);
    } else {
        console.log("Connected To TibCloud DB!");
        connection.release();
    }
});

module.exports = db;