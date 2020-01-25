const mongoose = require("mongoose"),
      Breed = require("./models/breedSchema"),
      Comment = require("./models/comment");

let data = [
  { name: "German Shepard",
    img: "https://www.schaeferhunde.de/fileadmin/_processed_/3/c/csm_verein-fuer-deutsche-schaeferhunde-zucht-EN_e19c1267d7.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  { name: "Pitbul",
    img: "https://xn--80atyad7e.xn--p1ai/media/breed/pitbull_9WILwL1.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  { name: "Haski",
    img: "https://mir24.tv/uploaded/images/2018/October/92a5fab36c223ef27949a7e64cd15ef8991da8f82d079dc995b0e9c12573c2e0.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

function seedDB() {
  Breed.deleteMany({}, function (err) {
    if(err){
      console.log(err);
    }
    console.log("Removed");
    data.forEach(seed => {
      Breed.create(seed, function (err, breed) {
        if(err) {
          console.log(err);
        } else {
          console.log("Added Breeds!");
          Comment.create(
            {
              text: "what a great budd !",
              author: "Peter"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                breed.comments.push(comment);
                breed.save();
                console.log("Created new comment");
              }
          });
        }
      })
    })
  });
}

module.exports = seedDB;
