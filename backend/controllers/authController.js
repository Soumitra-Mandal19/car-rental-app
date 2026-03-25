const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const userModel = require("../models/userModel");

function HomeResponse(req, res) {
  res.status(200).send("Server is Running");
}

function TestResponse(req, res) {
  console.log(req.body);
  res.send("Check console");
}

async function registerUser(req, res) {
  try {
    //1. Get data from request
    const { name, email, password, role } = req.body;
    // console.log("Original pwd", password);

    //2. check if email already exists

    userModel.getUserByEmail(email, async(err, result) => {
      if(err) {
        console.log("DB error:", err );
        return res.status(400).json({message:"Server Error"})
      }
      if(result.length > 0) {
        return res.status(400).json({message: "Email already exists"})
      }
    })

    //3. Hash the password
    const hashedpwd = await bcrypt.hash(password, 10);
    // console.log(hashedpwd);

    //4. using userModel to send data to model for db query

    userModel.createUser(
      [name, email, hashedpwd, role], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error creating user");
      }

      //5. Success response
      res.status(201).json({message: "User Created Successfully"});
    }
);


  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
}


function loginUser (req, res) {

    try {
        
        //1. get password and email from request
        const {email, password} = req.body;

         // check what backend received
        // console.log("Email received from Postman:", email);
        // console.log("Password received from Postman:", password);

        //2. using userModel to send data to function in model
          userModel.getUserByEmail( email, async (err, result) => {
            if(err) {
                console.log("DB Error:",err);
                return res.status(500).json({message:"Server Error"})
            }
            // console.log("Email recieved", email);
            // console.log("DB result:", result);
            
        // 3. Check if user exists
            if(result.length === 0) {
                return res.status(404).json({message:"User Not Found"})
            }

        //4. Get user object 
        const user = result[0];
        // console.log("USER FOUND:", user);
        
        //5. Compare password
        // res.send("User Fetched , now compare password")
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
           return res.status(400).json({message:"Invalid Password"});
        } 

        //Generate JWT
        const token = jwt.sign(
            {userId: user.id,
             role: user.role   
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login Successful",
            token: token,
            role: user.role
        });

        }

          )



    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }
}

module.exports = { HomeResponse, TestResponse, registerUser, loginUser};
