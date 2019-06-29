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
  });

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



exports.signup = async (req, res) => {
  // Validation
  let duplicate = await User.find(
    { username: req.body.username },
    (err, duplicate) => (err ? console.log(err) : duplicate)
  );

  if (duplicate.length > 0) {
    res.render("signup", {
      errors: ["Username already taken."]
    });
    return;
  } else if (req.body.username.length > 32) {
    res.render("signup", {
      errors: ["Username should be less than 32 characters."]
    });
    return;
  } else if (req.body.username.length < 3) {
    res.render("signup", {
      errors: ["Username should be more than 3 characters long."]
    });
    return;
  } else if (req.body.password !== req.body.confirm) {
    res.render("signup", { errors: ["Passwords don't match."] });
    return;
  } else if (req.body.password.length < 6) {
    res.render("signup", {
      errors: ["Password should be 6 or more characters long."]
    });
    return;
  } else if (req.body.password.length > 32) {
    res.render("signup", {
      errors: ["Password should be less than 32 characters long."]
    });
    return;
  }

  // Check secret code
  let inviteQuery = { _id: "5d17e8fba0184224cbf7811b" };
  let invite = await User.findById(inviteQuery, (err, invite) =>
    err ? console.log(err) : invite
  );
  bcrypt.compare(req.body.invite, invite.password, (err, isMatch) => {
    if (err) {
      console.log(err);
    } else {
      if (isMatch) {
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
              }).save(err =>
                err
                  ? next(err)
                  : res.render("login", { success: ["You are now a member!"] })
              );
            }
          });
        });
      } else {
        res.render("signup", { errors: ["That's not the secret code."] });
      }
    }
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
