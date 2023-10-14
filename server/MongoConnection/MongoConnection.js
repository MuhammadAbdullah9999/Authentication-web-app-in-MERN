// Import the necessary modules
const mongoose = require('mongoose');

// Connecting the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/UsersDB');


// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports=User;


