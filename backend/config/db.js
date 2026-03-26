const mysql = require('mysql2');
require('dotenv').config();
const fs = require('fs');



const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
         ca: Buffer.from(process.env.DB_CERT || '', 'utf-8')
    }
});


db.getConnection((err, connection) => {
    if(err) {
        console.log("Error in connection with DB:", err);
        
    } else {
        console.log("Connected To TibCloud DB!");
        connection.release();
        
    }
});

module.exports = db;