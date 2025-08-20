var express = require("express");
var router = express.Router();
const users = require("./users");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/create", async function (req, res) {
  const userData = await users.create({
    username: "muzamil",
    email: "muzaiml@gmail.com",
    password: "pass",
  });

  res.send(user)
});

router.get("/find", async function (req, res) {
  const find = await users.find();

  res.send(find);
});
module.exports = router;
