const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  name: String,
  age: String,
  img: String,
  desc: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Breed", breedSchema);
