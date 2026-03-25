# 🚗 Car Rental Application

A full-stack Car Rental Web Application built using **Node.js, Express, MySQL, and Vanilla JavaScript**.

---

## 🚀 Features

* Customers can browse and book cars
* Agencies can add, edit cars and view bookings
* Secure authentication using **JWT (JSON Web Tokens)**
* Role-based access (Customer / Agency)

---

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* Vanilla JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MySQL

**Authentication**

* JWT (JSON Web Token)
* bcrypt (password hashing)

---

## 📁 Project Folder Structure

```
car-rental-app/
├── backend/
├── frontend/
├── car_rental.sql
├── README.md
```

---

# 🔧 Backend Overview

## 📂 Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── carController.js
│   ├── bookingController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── userModel.js
│   ├── carModel.js
│   ├── bookingModel.js
├── routes/
│   ├── authRoutes.js
│   ├── carRoutes.js
│   ├── bookingRoutes.js
├── app.js
├── package.json
├── .env
├── .env.example
```

---

## 🗄️ Database Setup

1. Open MySQL Workbench
2. Run:

```sql
CREATE DATABASE car_rental;
```

3. Import:

```
car_rental.sql
```

This file contains:

* users table
* cars table
* bookings table

---

## ⚙️ Environment Variables

Create file:

```
backend/.env
```

Add:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=car_rental
PORT=8089
JWT_SECRET=mysecretkey
```

---

## 📄 .env.example

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=car_rental
PORT=8089
JWT_SECRET=your_secret_key
```

---

## 🚀 Run Backend

```bash
cd backend
npm install
node app.js
```

Server runs on:

```
http://localhost:8089
```

---

## 🔐 Authentication (JWT)

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Token Usage

```
Authorization: Bearer <token>
```

### Token Contains:

* userId
* role (customer / agency)

### Security:

* Password hashed using bcrypt
* Token expires in 1 day

---

## 🛡️ Auth Middleware

* Verifies JWT token
* Attaches user info to `req.user`
* Protects private routes

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 🚗 Cars

* POST `/api/cars` (Protected - Agency)
* PUT `/api/cars/:id` (Protected - Agency)
* GET `/api/cars` (Public)

### 📅 Bookings

* POST `/api/bookings` (Protected - Customer)
* GET `/api/agency/bookings` (Protected - Agency)

---

# 🌐 Frontend Overview

Built using **HTML, CSS, and Vanilla JavaScript**

## 📂 Structure

```
frontend/
├── assets/
├── css/
├── js/
│   ├── config.js
│   ├── auth.js
│   ├── navbar.js
│   ├── booking.js
│   ├── addCar.js
│   ├── cars.js
│   ├── agencyBookings.js
├── index.html
├── login.html
├── bookings.html
├── add-car.html
├── booking-success.html
```

---

## 🔗 API Configuration

Base URL:

```
http://localhost:8089/api
```

Configured in:

```
frontend/js/config.js
```

---

## 🔐 Frontend Authentication

* JWT stored in `localStorage`
* Role stored for UI control

Example:

```javascript
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
```

---

## 🧭 Navbar Behavior

**Not Logged In**

* Login / Register

**Logged In**

* My Bookings
* Logout

---

## 🔄 Application Flow

### 👤 Customer

1. Register / Login
2. View cars
3. Book car
4. View bookings

### 🏢 Agency

1. Login
2. Add cars
3. Edit cars
4. View bookings

---

## ▶️ Run Frontend

Open in browser:

```
frontend/index.html
```

---

## ⚠️ Important Notes

* Backend must be running before frontend
* Ensure correct API URL
* Token required for protected routes

---

## 🧪 Sample Test Credentials

### 👤 Customer

* Email: [ajay@gmail.com]
* Password: 123456

### 🏢 Agency

* Email: [agency1@example.com]
* Password: 123456



---

## 🚧 Future Improvements

* Payment integration
* Admin dashboard
* Responsive UI

---

## 👨‍💻 Author

**Soumitra Mandal**
