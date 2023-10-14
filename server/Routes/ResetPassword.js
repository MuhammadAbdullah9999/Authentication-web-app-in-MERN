
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../MongoConnection/MongoConnection");
const bcrypt = require("bcrypt");
require('dotenv').config()

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

router.post('/',(req,res)=>{
    // console.log(req.body);
  
    const {token}=req.body;
  
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        res.status(500).json({message:"Invalid Request"}).send();
      } else {
  
        const email=decoded.email;
        const {password,confirmPassword}=req.body;

        if(password !== confirmPassword){
          res.status(500).json({ message: "Password and Confirm Password do not match" }).send();
        }
  
        console.log(email);
         const user = await User.findOne({ email: email });
  
        if(user){
          const hashedPassword = bcrypt.hashSync(password, saltRounds);
          user.password = hashedPassword;
          res.send(200);
        }
        else{
          res.status(404).json({message:"User not exist with provided email"});
        }
      }
    });  
  });
  module.exports=router;