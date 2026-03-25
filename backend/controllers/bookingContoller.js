const bookingModel = require("../models/bookingModel");
const carModel = require("../models/carModel");

// Rent car - only for Customers

function rentCar(req, res) {
  try {
    const customerId = req.user.userId; // from JWT
    const role = req.user.role; // from JWT

    // 1. Only customers can rent car
    if (role !== "customer") {
      return res.status(403).json({ message: "Only customers can rent cars" });
    }

    // 2. get data from request
    const { carId, startDate, noOfDays } = req.body;
     
    //3. validation
    if (!carId || !startDate || !noOfDays) {
      return res
        .status(400)
        .json({ message: "Please provide carId, startDate and noOfDays" });
    }

    if(noOfDays <= 0) {
        return res.status(400).json({message: "Number of days must be greater than 0"});
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const bookingDate = new Date(startDate);
    bookingDate.setHours(0,0,0,0);

    if(bookingDate < today) {
        return res.status(400).json({message: "Start date cannot be in the past"})
    }

    // 4. get car info via carModel
   

    carModel.getCarById(carId, (err, carResult) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });

      if (carResult.length === 0) {
        return res.status(404).json({ message: "Car not found" });
      }

      const car = carResult[0];

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(noOfDays));

    bookingModel.checkCarAvailability(carId, startDate, endDate, (err, bookings)=> {
        if(err) return res.status(500).json({message: "DB error", error:err});

        if(bookings.length > 0) {
            return res.status(400).json({
                message: "Car is already booked for selected dates"
            })
        }


             const totalCost = Number(car.rent_per_day) * Number(noOfDays);

      // 5. insert booking

      bookingModel.createBooking(
        [car.id, customerId, startDate, noOfDays, totalCost],
        (err, result) => {
          if (err)
            return res.status(500).json({ message: "DB error", error: err });

          res.status(201).json({
            message: "Booking Successful",
            booking: {
              bookingId: result.insertId,
              carId: car.id,
              customerId,
              startDate,
              noOfDays,
              totalCost,
              vehicleModel: car.vehicle_model, 
              vehicleNumber: car.vehicle_number,
            },
          });
        },
      );



    })


     
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// get all bookings for agency

function getAgencyBookings(req, res) {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    //1. Only agency can view this bookings
    if (role !== "agency") {
      return res
        .status(403)
        .json({ message: "Only agencies can view bookings" });
    }

    bookingModel.getBookingsByAgency(userId, (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });

      res.status(200).json({ bookings: results });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { rentCar, getAgencyBookings };
