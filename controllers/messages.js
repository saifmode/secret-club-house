const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/User");
let Message = require("../models/Message");

exports.index = (req, res) => {
  if (res.locals.currentUser) {
    res.send('welcome to secret message club')
  } else {
    res.send('you uninvited')
  }
}