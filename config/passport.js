const LocalStrategy = require("passport-local").Strategy;
let User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  // Local Strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match username
      let query = { username };
      User.findOne(query, (err, user) => {
        // Look for user, break from function if not found
        if (err) throw err;
        if (!user) {
          console.log("no user found");
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          isMatch
            ? done(null, user)
            : done(null, false, {
                message: "Wrong username or password."
              });
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};