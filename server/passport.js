const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require("express-session");
const GoogleUser=require('./MongoConnection/GoogleUser')
const jwt = require("jsonwebtoken");
require('dotenv').config()

const secretKey = process.env.SECRET_KEY;
const clientID='process.env.GOOGLE_CLIENT_ID'
const clientSecret='process.env.GOOGLE_CLIENT_SECRET'

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userData = {
        name: profile._json.name,
        email: profile._json.email,
        authType:"Google",
      };
      // Generate JWT
      const token = jwt.sign(userData, secretKey);

      // Save the user's data to the GoogleUser database
      const newUser = new GoogleUser(userData);
      await newUser.save();

      // Redirect the user to the success endpoint with the user data
      return done(null, { token, redirectTo: '/auth/google/success' });
    } catch (error) {
      done(error, null);
    }
  }
));