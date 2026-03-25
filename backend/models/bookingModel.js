const db = require("../config/db");

//1. create booking 

function createBooking(data, callback) {
    const query = `
                INSERT INTO bookings
                (car_id, customer_id, start_date, number_of_days, total_cost)
                VALUES (?,?,?,?,?)
            `;
    db.query(query, data, callback);
}

//2. get agency booking

function getBookingsByAgency (userId, callback) {
    const query =  `
            SELECT 
                  b.id AS booking_id,
                  b.start_date,
                  b.number_of_days,
                  b.total_cost,
                  u.id AS customer_id,
                  u.name AS customer_name,
                  u.email AS customer_email,
                  c.vehicle_model,
                  c.vehicle_number
                  FROM bookings b
                  JOIN cars c ON b.car_id = c.id
                  JOIN users u ON b.customer_id = u.id
                  WHERE c.agency_id = ?
        `;

    db.query(query, [userId], callback);    
}

//3 . check car availablity 

function checkCarAvailability (carId, startDate, endDate, callback) {
    const query = `
    SELECT * FROM bookings
    WHERE car_id = ?
    AND (
     start_date <= ? AND DATE_ADD(start_date, INTERVAL number_of_days DAY) > ?
    )
    `
    db.query(query, [carId, endDate, startDate], callback);
}

module.exports = {createBooking, getBookingsByAgency, checkCarAvailability}