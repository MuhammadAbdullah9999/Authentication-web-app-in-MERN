const express = require("express");
const jwt = require("jsonwebtoken");
const GoogleUser = require('../MongoConnection/GoogleUser');
const User = require("../MongoConnection/MongoConnection");
const router = express.Router();
require('dotenv').config()


const secretKey = process.env.SECRET_KEY;

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({message:"Invalid Request"}).send();
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await (decoded.authType ? GoogleUser : User).findOne({ email: decoded.email });

    if (user) {
      const response = {
        name: user.name,
        email: user.email,
      };
      return res.send(response);
    } else {
      return res.status(404).json({message:"User not exist"}).send();
    }
  } catch (error) {
    res.status(500).json({message:"Invalid Request"}).send();
  }
});

module.exports = router;
