const express       = require(`express`),
      router        = express.Router(),
      passport      = require(`passport`),
      User          = require(`../models/user`),
      { loginCredentials }     = require(`../middleware/index`);

router.get(`/`, function (req,res) {
  res.render(`landing`);
});

router.get(`/register`, function(req,res){
  res.render(`register`);
});

router.post(`/register`, function(req,res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
    if(err){
      req.flash(`error`, err.message);
      return res.redirect(`back`);
    } else {
      passport.authenticate(`local`)(req,res, function(){
        req.flash(`success`, `Welcome to Breed Camp, ${ newUser.username }!`);
        res.redirect(`/breeds`);
      });
    }
  });
});

router.get(`/login`, function(req,res){
  res.render(`login`);
});

router.post(`/login`, loginCredentials, passport.authenticate(`local`, {
    successRedirect: `/breeds`,
    failureRedirect: `/login`
  }), function(req,res){
  }
);

router.get(`/logout`, function(req,res){
  req.logout();
  req.flash(`success`, `You successfully logged out.`);
  res.redirect(`/breeds`);
});

module.exports = router;
