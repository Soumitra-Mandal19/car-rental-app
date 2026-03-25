const db = require('../config/db');

// 1. Add new car

function addCar(data, callback) {
     const query = `
            INSERT INTO cars
            (agency_id, vehicle_number, vehicle_model, seating_capacity, rent_per_day, image_url)
            VALUES (?,?,?,?,?,?)
        `;
    db.query(query, data, callback)    
}

// 2. get car by ID (used in editCar)

function getCarById (carId, callback) {
    const query = "SELECT * FROM cars WHERE id = ?";
    db.query(query, [carId], callback)
}

// 3. update car

function updateCar (data, callback) {
    const query = `
            UPDATE cars
            SET vehicle_model = ?, vehicle_number = ?, seating_capacity = ?, rent_per_day = ?, image_url = ?
            WHERE id = ?
            `;
    db.query(query, data, callback)        
}

// 4. get all cars
function getAllCars(callback) {
    const query = `
        SELECT id AS id,
               vehicle_model AS vehicleModel,
               vehicle_number AS vehicleNumber,
               seating_capacity AS seatingCapacity,
               rent_per_day AS rentPerDay,
               image_url AS imageUrl
               FROM cars        
        `;

        db.query(query, callback)
}

module.exports = {addCar, getCarById, updateCar, getAllCars}