# 🚗 Car Rental Application

A full-stack Car Rental Web Application built using **Node.js, Express, MySQL, and Vanilla JavaScript**.


---

## 🌐 Live Deployment

### 🚀 Frontend (Vercel)
https://car-rental-lyzpc5wbz-soumitra-mandals-projects.vercel.app

### 🚀 Backend (Render)
https://car-rental-app-6frm.onrender.com

### 🗄️ Database
TiDB Cloud (MySQL-compatible distributed database)

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

* TiDB Cloud (MySQL-compatible distributed database)

**Authentication**

* JWT (JSON Web Token)
* bcrypt (password hashing)

---

## 📡 Deployment Architecture

Frontend (Vercel)  
↓  
Backend (Render)  
↓  
Database (TiDB Cloud)

## 📁 Project Folder Structure

---

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
* Additionally, insert queries for cars are also included in the project.

* > 🔐 Note: The backend connects securely to TiDB Cloud using SSL (cert.pem).

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
PORT=4000
JWT_SECRET=mysecretkey
```

---

## 📄 .env.example

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=car_rental
PORT=4000
JWT_SECRET=your_secret_key
```

---

## 🚀 Run Backend

```bash
cd backend
npm install
npm run dev (development mode)
OR
npm start (production mode)
```

Server runs on:

```
http://localhost:4000
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
https://car-rental-app-6frm.onrender.com/api
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

## ▶️ Run Frontend (Local)

This project uses plain HTML, CSS, and JavaScript (no framework).

### Option 1: Open Directly

Simply open the file in your browser:

frontend/index.html

---

### Option 2: Using VS Code Live Server (Recommended)

1. Install "Live Server" extension in VS Code  
2. Right-click on `index.html`  
3. Click **"Open with Live Server"**  

This helps avoid CORS issues and provides better experience.

---

## ⚠️ Important Notes

- Backend is deployed on Render
- Frontend is deployed on Vercel
- Database is hosted on TiDB Cloud
- Ensure correct API URL is used
- JWT token required for protected routes

---

## 🧪 Sample Test Credentials

### 👤 Customer

* Email: ajay@gmail.com
* Password: 123456

### 🏢 Agency

* Email: agency1@example.com
* Password: 123456



---

## 🚧 Future Improvements

* Payment integration
* Admin dashboard
* Responsive UI

---

## 👨‍💻 Author

**Soumitra Mandal**
