const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    max: 32,
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false
  }
});

let User = module.exports = mongoose.model('User', UserSchema)