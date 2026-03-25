CREATE DATABASE car_rental;

USE car_rental;


CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255),
 role ENUM('customer', 'agency'),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cars (
id INT AUTO_INCREMENT PRIMARY KEY,
agency_id INT,
vehicle_model VARCHAR(100),
vehicle_number VARCHAR(50) UNIQUE,
seating_capacity INT,
rent_per_day INT,
image_url VARCHAR(255),
FOREIGN KEY (agency_id) REFERENCES users(id) ON DELETE CASCADE
 );

 CREATE TABLE IF NOT EXISTS bookings (
id INT AUTO_INCREMENT PRIMARY KEY,
car_id INT NOT NULL,
customer_id INT NOT NULL,
start_date DATE NOT NULL,
number_of_days INT NOT NULL,
total_cost INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE

);


INSERT INTO cars (agency_id, vehicle_model, vehicle_number, seating_capacity, rent_per_day, image_url)
VALUES
(4, 'Toyota Corolla', 'KA04AB1001', 5, 1500,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2010_Toyota_Corolla_CE%2C_Front_Left%2C_04-13-2021.jpg/330px-2010_Toyota_Corolla_CE%2C_Front_Left%2C_04-13-2021.jpg'),
(4, 'Honda City', 'KA04AB1002', 5, 1400, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg/330px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg'),
(4, 'Maruti Swift', 'KA04AB1003', 4, 1200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvvML7mliFXtWe5W6pDk-KKqSF_dr0oA1Pg&s'),
(4, 'Hyundai i20', 'KA04AB1004', 5, 1300, 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg'),
(4, 'Ford EcoSport', 'KA04AB1005', 5, 1600, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ford_EcoSport_%2811328730853%29.jpg/330px-Ford_EcoSport_%2811328730853%29.jpg'),
(4, 'Toyota Innova', 'KA04AB1006', 6, 2200, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Toyota_Innova_GCC_front.jpg/330px-Toyota_Innova_GCC_front.jpg'),
(4, 'Honda Amaze', 'KA04AB1007', 4, 1250, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Honda_Amaze_2018_%28front%29_in_Uttar_Pradesh.jpg/330px-Honda_Amaze_2018_%28front%29_in_Uttar_Pradesh.jpg'),
(4, 'Maruti Baleno', 'KA04AB1008', 5, 1350, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg/330px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg'),
(4, 'Hyundai Creta', 'KA04AB1009', 5, 1800, 'https://media.zigcdn.com/media/content/2015/Jul/hyundai-creta-diesel-review-road-test-zigwheels-india-t1.jpg?tr=w-1200')
;


INSERT INTO cars (agency_id, vehicle_model, vehicle_number, seating_capacity, rent_per_day, image_url)
VALUES
(8, 'XUV 500', 'KA08AB2001', 7, 2000, 'https://stimg.cardekho.com/images/car-images/large/Mahindra/Mahindra-XUV500/volcano-black.jpg?tr=w-420'),
(8, 'Mitsubishi Pajero Sport', 'KA08AB2002', 7, 2200, 'https://imgd.aeplcdn.com/664x374/ec/b8/0e/9739/img/m/Mitsubishi-Pajero-Sport-Right-Front-Three-Quarter-52939_ol.jpg?v=201711021421&q=80'),
(8, 'BMW 320d', 'KA08AB2003', 5, 3500, 'https://img.autotrader.co.za/27565062'),
(8, 'Audi A6', 'KA08AB2004', 5, 4000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Audi_A6_C9_IAA_2025_DSC_1920.jpg/330px-Audi_A6_C9_IAA_2025_DSC_1920.jpg'),
(8, 'Tata Nexon', 'KA08AB2005', 5, 1400, 'https://upload.wikimedia.org/wikipedia/commons/2/25/Tata_Nexon_Blue_Dual_Tone.jpg'),
(8, 'Toyota Innova', 'KA08AB2006', 6, 2200, 'https://cpimg.tistatic.com/7673503/b/1/toyota-innova-crysta.jpg');