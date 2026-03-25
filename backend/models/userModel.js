const db = require("../config/db");
//1. createuser --> register user
function createUser(data, callback) {
    const query = `
        INSERT INTO users
        (name, email, password, role)
        VALUES (?,?,?,?)
    `;

    db.query(query, data, callback);
}


//2. find user during login via email stored in db
function getUserByEmail (email, callback) {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
}

module.exports = { createUser , getUserByEmail};