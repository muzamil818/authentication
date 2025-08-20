var express = require("express");
var router = express.Router();
const users = require("./users");
const localStrategy = require('passport-local').Strategy;
const passport = require("passport");

passport.use(new localStrategy(users.authenticate()))
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// router.get("/create", async function (req, res) {
//   const userData = await users.create({
//     username: "muzamil",
//     email: "muzaiml@gmail.com",
//     password: "pass",
//   });

//   res.send(user)
// });

router.get("/find", async function (req, res) {
  const find = await users.find();

  res.send(find);
});
router.get("/profile",isLoggedIn , function (req, res) {


  res.render("profile");
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, secret } = req.body;

    // Create a new user object without password
    const newUser = new users({ username, secret });

    // Register user with password hashing handled by passport-local-mongoose
    const registeredUser = await users.register(newUser, password);

    // Log the user in automatically after registration
    req.login(registeredUser, (err) => {
      if (err) {
        console.error("Login error after register:", err);
        return res.redirect("/");
      }
      return res.redirect("/profile");
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.redirect("/");
  }
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect: "/"
})  ,function (req, res) {
  
})

function isLoggedIn(req,res, next) {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}

router.get("/logout", function(req,res, next){
  req.logOut(function (err) {
    if(err){
      return next(err)
    }
    res.redirect('/')
  })
})


router.post("/register", function (req, res) {
  let userData = new users({
    username: req.body.username,
    email: req.body.email
  });

  users.register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/");
    });
});

module.exports = router;
