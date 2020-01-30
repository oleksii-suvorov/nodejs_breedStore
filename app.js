const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      mongoose        = require("mongoose"),
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      Breed           = require("./models/breedSchema"),
      Comment         = require("./models/comment"),
      User            = require("./models/user"),
      seedDB          = require("./seeds"),
      methodOverride  = require("method-override"),
      flash           = require("connect-flash");

const commentRoutes   = require("./routes/comments"),
      breedsRoutes    = require("./routes/breeds"),
      indexRoutes     = require("./routes/index");

// seedDB(); //load default breeds
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
  secret: "Some dog's secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.loggedUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(indexRoutes);
app.use("/breeds/:id/comments", commentRoutes);
app.use("/breeds", breedsRoutes);
mongoose.set('useFindAndModify', false);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server has been started on port 3000");
});
