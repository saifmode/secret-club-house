const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/User");

exports.post = (req, res) => {
  res.send("make a post")
}

exports.signup_form = (req, res) => {
  res.render("signup");
};

exports.signup = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      } else {
        password = hash;
        let user = new User({
          username,
          password
        }).save(err => (err ? next(err) : res.redirect("/login")));
      }
    });
  });
};

exports.login_form = (req, res) => {
  res.render("login");
};

exports.login = (req, res, next) => {
  require('../config/passport')(passport); 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req,res,next)
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

