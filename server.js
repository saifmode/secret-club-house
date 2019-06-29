const express = require("express"),
  path = require("path"),
  session = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  mongoose = require("mongoose"),
  exphbs = require("express-handlebars");
// Configure app
const app = express();

// 🐿 Configure Mongoose
// put line below in .env, then add .env to .gitignore
// MY_MONGO_DB = mongodb+srv://saifmode:70Poowalk@cluster0-b4cdn.mongodb.net/test?retryWrites=true&w=majority
const mongoDb = process.env.MY_MONGO_DB;
mongoose.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => console.log("We're connected to MongoDB!"));

// 👀 Set view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// 🔌 *** MIDDLEWARE 
// ******************
// *** Static *******
app.use(express.static("public"));
// *** Body parser **
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// *** Session ******
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// *** Passport *****
require('./config/passport')(passport); 
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});
// ******************
// ******************

// 🚠 Routes 🚠
app.use("/", require("./routes/index"));
app.use("/messages", require("./routes/messages"));

// 👂 Listening
const port = process.env.PORT || 1234
app.listen(port, () => console.log(`app listening on port ${port}!`));
