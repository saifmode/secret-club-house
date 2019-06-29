const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const moment = require("moment");
let User = require("../models/User");
let Message = require("../models/Message");

exports.load_index = async (req, res) => {
  let messages = await Message.find({}, (err, messages) =>
    err ? console.log(err) : messages
  );
  
  messages.forEach(message => {
    message.dateFromNow = moment(message.date).fromNow();
  })

  res.render("index", { welcome: "Secret Club House", messages });
};

exports.post = (req, res) => {
  if (res.locals.currentUser) {
    let message = {};
    message.username = res.locals.currentUser.username;
    message.userid = res.locals.currentUser._id;
    message.subject = req.body.subject;
    message.content = req.body.content.trim();
    message.date = new Date();
    new Message(message).save(err =>
      err ? console.log(err) : res.redirect("/")
    );
  } else {
    res.send("Nice try, smart ass.");
  }
};

exports.signup_form = (req, res) => {
  res.render("signup");
};

exports.signup = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let admin = req.body.admin ? true : false;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      } else {
        password = hash;
        let user = new User({
          username,
          password,
          admin
          
        }).save(err => (err ? next(err) : res.redirect("/login")));
      }
    });
  });
};

exports.login_form = (req, res) => {
  res.render("login");
};

exports.login = (req, res, next) => {
  require("../config/passport")(passport);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
