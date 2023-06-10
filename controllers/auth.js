const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require('express-jwt');

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    res.json({
      name: user.name,
      email: user.email,
      username: user.username,
      id: user._id,
      token
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ username })
    .then(user => {
      if (!user) { 
        return res.status(400).json({
          error: "Username does not exists"
        });
      }
  
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Username and password do not match"
        });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      const { _id, name, email, username } = user;
      return res.json({ user: { id:_id, name, email, token, username } });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        error: "Username does not exists"
      });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

// Protection Middlewares

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"]
})

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      if (err || !user) {
      return res.status(400).json({
          error: "No user was found in DB"
      });
      }
      req.profile = user;
      next();
  });
};
