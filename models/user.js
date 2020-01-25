const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const userScema = new mongoose.Schema({
  username: String,
  password: String
});

userScema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userScema);
