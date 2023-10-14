const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../MongoConnection/MongoConnection");
require('dotenv').config()

const router = express.Router();

const secretKey = process.env.SECRET_KEY;

router.get("/", (req, res) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(500).send();
        } else {
          const response = {
            name: decoded.name,
            email: decoded.email,
          };
          res.send(response);
        }
      });
    } else {
      res.status(500).json({message:"You are not signed In"}).send();
    }
  });
  
  router.post("/", async (req, res) => {
    console.log(req.body);
  
    if (req.body) {
   
      const email = req.body.email;
      const userEnteredPassword = req.body.password;
        
      const user = await User.findOne({ email: email });
    
      if (user) {
        console.log(user);
        const userPassword = user.password;
        console.log(userPassword)
  
        const passwordMatches = bcrypt.compareSync( userEnteredPassword, userPassword);
  
        if (passwordMatches) {
          console.log("pass");
          const response = {
            name: user.name,
            email: user.email,
          };
          const userData = {
            name: user.name,
            email: user.email,
            password: user.password,
          };
          // res.send(response);
          jwt.sign(userData, secretKey, { expiresIn: "1h" }, (err, token) => {
            res
              .status(200)
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true, // Ensures the cookie is accessible only via HTTP(S) requests
                secure: true, // Ensures the cookie is sent only over HTTPS in production
              })
              .json(response);
          });
          // res.send(response);
        } else {
          res.status(404).json({message:"Incorrect Password"}).send();
        }
      } else {
        res.status(500).json({message:"User not exists"}).send();
      }
    } else {
      res.status(500).json({message:"Empty field"}).send();
    }
  });
  module.exports=router;