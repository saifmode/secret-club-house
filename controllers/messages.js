const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const moment = require("moment");
let User = mongoose.model("User");
let Message = require("../models/Message");

exports.index = (req, res) => {
  res.send("i am a message");
};

exports.load_edit_form = async (req, res) => {
  if (res.locals.currentUser) {
    if (res.locals.currentUser.admin) {
      const query = { _id: req.params.id };

      let message = await Message.findById(query, (err, message) =>
        err ? console.log(err) : message
      );

      const date = moment(message.date).format("LLLL");

      res.render("edit_message", { message, date });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

exports.edit = async (req, res) => {
  if (res.locals.currentUser) {
    if (res.locals.currentUser.admin) {
      const query = { _id: req.params.id };
      let messageInDb = await Message.findById(query, (err, message) =>
        err ? console.log(err) : message
      );
      console.log("original: " + messageInDb.content);
      console.log("edited: " + req.body.content);
      const edited =
        req.body.content.toString() !== messageInDb.content.toString()
          ? true
          : false;
      Message.updateOne(
        query,
        { $set: { content: req.body.content, edited } },
        err => (err ? console.log(err) : res.redirect("/"))
      );
    }
  } else {
    res.redirect("/");
  }
};

exports.delete = (req, res) => {
  if (res.locals.currentUser) {
    if (res.locals.currentUser.admin) {
      const query = { _id: req.params.id };
      Message.deleteOne(query, err =>
        err ? console.log(err) : res.redirect("/")
      );
    }
  } else {
    res.redirect("/");
  }
};
