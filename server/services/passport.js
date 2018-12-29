// passport will help with user Authentication
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy; // strategy for verifying a user with a jwt
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local'); // strategy for verifying a user with username and password
// TODO future: strategy for fb login

// Create local Strategy
const localJwtOptions = {usernameField: "email"}; // password field is default
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
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // which header the token is located at
  secretOrKey: config.secret // which secret that should be used
};
// Create JWT strategy for token (user wants to login with token)
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
