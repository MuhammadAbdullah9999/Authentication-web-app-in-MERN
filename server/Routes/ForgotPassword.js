const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../MongoConnection/MongoConnection");
const nodemailer = require("nodemailer");
require('dotenv').config()


const secretKey = process.env.SECRET_KEY;
const emailHost = process.env.EMAIL_HOST;

router.post("/", async (req, res) => {
    const { email } = req.body;
    console.log(email);
  
    const user = await User.findOne({ email: email });
  
    if(user){
      console.log("user exists");
      let token = '';
      let signPromise = new Promise((resolve, reject) => {
        jwt.sign({ email }, secretKey, { expiresIn: 3600 }, (err, generatedToken) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            token = generatedToken;
            console.log(token);
            console.log(generatedToken);
            resolve();
          }
        });
      });
    
      signPromise
        .then(() => {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailHost,
              pass: "egavqqhjhrlsggvr",
            },
          });
    
          const mailOptions = {
            from: emailHost,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="http://localhost:3000/reset-password?token=${token}">here</a> to reset your password.</p>`,
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Failed to send password reset email." }).send();
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({ message: "Password reset email sent successfully." }).send();
            }
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Failed to generate password reset token." }).send();
        });
    }
    else{
      res.status(404).json({ message: "The email is Invalid." }).send();
    }
  
    
  });

  module.exports=router;