const mongoose = require("mongoose");
const moment = require("moment");
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().fromNow(),
    required: true,
  },
  subject: {
    type: String,
  },
  content: {
    type: String
  },
  likes: {
    type: Number,
    default: 0,
  }
});

let Message = (module.exports = mongoose.model("Message", MessageSchema));
