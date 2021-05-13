const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "209446392745-h16shq307vaoj66b4l935cp32podo89p.apps.googleusercontent.com",
      clientSecret: "iL_gMGHV0ixyPD7IlguDzmgy",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google auth", err);
          return;
        }
        // console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          // if not found create user and set it as req.user(sign in)
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user google auth", err);
                return;
              } else {
                return done(null, user);
              }
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
