const express                               = require(`express`),
      router                                = express.Router({ mergeParams: true }),
      Breed                                 = require(`../models/breedSchema`);
      Comment                               = require(`../models/comment`),
      middlewareObj                         = require(`../middleware`),
      { isLoggedIn, checkCommentOwnership } = middlewareObj;

router.get(`/new`, isLoggedIn, function(req,res){
  Breed.findById(req.params.id, function(err, breedFoundById){
    if(err){
      console.log(err);
    } else {
      res.render(`comments/new`, { breed: breedFoundById });
    }
  });
});

router.post(`/`, isLoggedIn, function(req,res){
  Breed.findById(req.params.id, function(err, breedFoundById){
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          req.flash(`error`, `Something went wrong.`)
          console.log(err);
        } else {
          comment.author.username = req.user.username;
          comment.author.id = req.user._id;
          comment.save();
          breedFoundById.comments.push(comment);
          breedFoundById.save();
          req.flash(`success`, `Successfully added comment.`)
          res.redirect(`/breeds/${breedFoundById._id}`);
        }
      });
    }
  });
});

router.get(`/:commentId/edit`, checkCommentOwnership, function(req, res){
  Breed.findById(req.params.id, function(err, foundBreed){
    if(err || !foundBreed){
      req.flash(`error`, `Post not found!`);
      return res.redirect(`back`);
    };
    Comment.findById(req.params.commentId, function(err, comment){
      if(err){
        res.redirect(`back`);
      } else {
        res.render(`comments/edit`, { breedId: req.params.id, comment });
      }
    });
  });
});

router.put(`/:commentId`, checkCommentOwnership, function(req, res){
  let updatedComment = req.body.comment
  Comment.findByIdAndUpdate(req.params.commentId, updatedComment, function(err, savedComment){
    if(err){
      res.redirect(`back`)
    } else {
      res.redirect(`/breeds/${req.params.id}`);
    }
  });
});

router.delete(`/:commentId`, checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.commentId, function(err){
    if(err){
      console.log(err);
      res.redirect(`back`);
    } else {
      req.flash(`success`, `Comment deleted.`)
      res.redirect(`/breeds/${req.params.id}`);
    }
  });
});

module.exports = router;
