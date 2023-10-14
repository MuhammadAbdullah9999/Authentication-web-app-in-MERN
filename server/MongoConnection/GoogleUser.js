const mongoose = require('mongoose');


const googleUserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const GoogleUser=mongoose.model('GoogleUser',googleUserSchema)

module.exports=GoogleUser;