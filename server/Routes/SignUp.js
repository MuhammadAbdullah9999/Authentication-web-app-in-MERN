const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../MongoConnection/MongoConnection");
require('dotenv').config()


const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const router = express.Router();

router.post("/", async (req, res) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
  
    // const userData=req.body;
  
    const existingUser = await User.findOne({ email: userData.email });
  
    if (existingUser) {
      res.status(409).json({ message: "User already exists!" }).send();
    } else {
      const hashedPassword = bcrypt.hashSync(userData.password, saltRounds);
      userData.password = hashedPassword;
  
      const user = new User(userData);
      await user.save();
  
      jwt.sign(userData, secretKey, { expiresIn: "1h" }, (err, token) => {
        const response = {
          name: userData.name,
          email: userData.email,
        };
        res
          .status(200)
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true, // Ensures the cookie is accessible only via HTTP(S) requests
            secure: true, // Ensures the cookie is sent only over HTTPS in production
          })
          .json(response);
      });
    }
  });

  module.exports=router;