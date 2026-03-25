const carModel = require("../models/carModel");

// Add new car (agency only)

function addNewCar(req, res) {
  try {
    //1. Get data from request
    const {
      vehicleModel,
      vehicleNumber,
      seatingCapacity,
      rentPerDay,
      imageUrl,
    } = req.body;

    //2. validation

     if (!vehicleModel || !vehicleNumber || !seatingCapacity || !rentPerDay) {
      return res.status(400).json({
        message: "All fields except imageUrl are required",
      });
    }

    //3. Temporarily hardcoded agencyID (later we will replace by JWT)
    // const agencyId = 1;
    //2. use logged-in user id from jwt
    const agencyId = req.user.userId;

    // allow only agency
    if (req.user.role !== "agency") {
      return res.status(403).json({ message: "Only agencies can add cars" });
    }

    //4. using carModel

    carModel.addCar(
      [
        agencyId,
        vehicleNumber,
        vehicleModel,
        seatingCapacity,
        rentPerDay,
        imageUrl || null,
      ],
      (err, result) => {
        if (err) {
          console.log("DB error: ", err);
          return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({
          message: "Car added successfully",
          carId: result.insertId,
        });
      },
    );
  } catch (error) {
    console.log("Catch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// edit car - agency that owns can edit car

function editCar(req, res) {
  try {
    const carId = req.params.id;
    const {
      vehicleModel,
      vehicleNumber,
      seatingCapacity,
      rentPerDay,
      imageUrl,
    } = req.body;
    const userId = req.user.userId;
    console.log(userId);
    const userRole = req.user.role;
    console.log(userRole);

    //1. only agency can edit
    if (userRole !== "agency") {
      return res.status(403).json({ message: "Only agencies can edit cars" });
    }

    // 2.using carmodel function getCarById
    carModel.getCarById(carId, (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      if (result.length === 0) {
        return res.status(404).json({ message: "Car not found" });
      }

      const car = result[0];

      // console here to check agency_id
      console.log("Car agency_id from DB:", car.agency_id);
      console.log("Logged in userId from JWT:", userId);

      if (car.agency_id !== userId) {
        return res.status(403).json({ message: "You do not own this car" });
      }

      carModel.updateCar(
        [
          vehicleModel,
          vehicleNumber,
          seatingCapacity,
          rentPerDay,
          imageUrl || null,
          carId,
        ],
        (err, result) => {
          if (err)
            return res.status(500).json({ message: "DB Error", error: err });

          res.status(200).json({ message: "Car updated successfully" });
        },
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get all cars function

function getAllCars(req, res) {
  try {
    // using carModel's function getAllcars

    carModel.getAllCars((err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { addNewCar, editCar, getAllCars };
