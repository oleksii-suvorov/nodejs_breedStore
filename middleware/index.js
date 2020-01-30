const Breed   = require("../models/breedSchema"),
      Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkBreedOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Breed.findById(req.params.id, function(err, breed){
      if(err || !breed){
        req.flash("error", "Post not found!");
        res.redirect(`/breeds`);
      } else {
        if(breed.author.id.equals(req.user._id )){
          next()
        } else {
          req.flash("error", "Permission denied.")
          res.redirect(`/breeds/${req.params.id}`);
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that.")
    res.redirect(`/breeds`);
  }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentId, function(err, comment){
      if(err || !comment){
        req.flash("error", "Comment not found!")
        res.redirect(`/breeds`);
      } else {
        if(comment.author.id.equals(req.user._id )){
          next()
        } else {
          req.flash("error", "Permission denied.")
          res.redirect(`/breeds`);
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  } else {
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("/login")
  }
};

middlewareObj.loginCredentials = function(req, res, next){
  if(req.body.username === ""){
    req.flash("error", "Please enter your username.");
    next();
  } if (req.body.password === "") {
    req.flash("error", "Please enter your password.");
    next();
  } else {
    next();
  }
}

module.exports = middlewareObj;
