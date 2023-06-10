var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 8 }),
    check("username", "username should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("username", "username is required").isLength({ min: 3 }),
    check("password", "password field is required").isLength({ min: 8 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;