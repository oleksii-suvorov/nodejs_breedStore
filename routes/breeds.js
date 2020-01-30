const express                             = require(`express`),
      router                              = express.Router(),
      Breed                               = require(`../models/breedSchema`),
      middlewareObj                       = require(`../middleware`),
      { isLoggedIn, checkBreedOwnership } = middlewareObj;

router.get(`/`, function (req, res) {
  Breed.find({}, function(err, foundBreeds){
    if(err) throw err;
    res.render(`breeds/index`, { breeds: foundBreeds });
  });
});

router.get(`/create`, isLoggedIn, function (req,res) {
  res.render(`breeds/create`);
});

router.post(`/create`, isLoggedIn, function (req,res) {
  let newBreed = req.body.breed;
  let sendBreedToDB = {
    name: newBreed.name,
    age: newBreed.age,
    standard: newBreed.standard,
    img: newBreed.img,
    desc: newBreed.desc,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Breed.create(sendBreedToDB, function (err, createdBreed) {
    if(err){
      console.log(err);
    } else {
      res.redirect(`/breeds`);
    }
  });
});

router.get(`/:id`, function(req,res){
  Breed.findById(req.params.id).populate(`comments`).exec(function(err, foundIdBreed){
    if(err || !foundIdBreed){
      req.flash(`error`, `Post not found!`)
      res.redirect(`/breeds`)
    } else {
      res.render(`breeds/showBreed`, { breed: foundIdBreed });
    }
  });
});

router.get(`/:id/edit`, checkBreedOwnership, function(req,res){
    Breed.findById(req.params.id, function(err, breed){
      if(err){
        req.flash(`error`, `Post is not found.`)
        console.log(err);
      } else {
        res.render(`breeds/edit`, { breed });
      }
    });
});

router.put(`/:id`, checkBreedOwnership, function (req,res){
  let updatedBreed = {
    name: req.body.breed.name,
    age: req.body.breed.age,
    standard: req.body.breed.standard,
    img: req.body.breed.img,
    desc: req.body.breed.desc,
    author: {
      id: req.user.id,
      username: req.user.username
    }
  };
    Breed.findByIdAndUpdate(req.params.id, updatedBreed, function (err, breed) {
    if(err){
      console.log(err);
    } else {
      res.redirect(`/breeds/${req.params.id}`);
    }
  });
});

router.delete(`/:id`, checkBreedOwnership, function (req, res) {
  Breed.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect(`/breeds`);
    } else {
      res.redirect(`/breeds`);
    }
  })
})

module.exports = router;
