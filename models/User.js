const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }
});

let User = module.exports = mongoose.model('User', UserSchema)