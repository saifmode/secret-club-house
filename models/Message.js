const mongoose = require("mongoose");
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
    type: Date,
  },
  dateFromNow: {
    type: String,
    default: "many moons ago",
    required: true
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
  },
});

MessageSchema.virtual('url')
.get(function() {
  return 'messages/' + this._id;
});

let Message = (module.exports = mongoose.model("Message", MessageSchema));
