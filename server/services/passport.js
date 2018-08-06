// passport will help with user Authentication
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local Strategy
const localJwtOptions = {usernameField: "email"};; // password field is default
const localLogin = new LocalStrategy(localJwtOptions, function(email, password, done){
  // Verify user email and password
  User.findOne({email: email}, function(err, user){
    if (err) { return(err);}
    if (!user) { return done(null, false);}
    // Compare passwords
    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err);}
      if(!isMatch) { return done(null, false);}
      return done(null, user)
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy for token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
