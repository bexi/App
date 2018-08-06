// passport will help with user Authentication
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStragety = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT Strategy
const jwtLogin = new JwtStragety(jwtOptions, function(payload, done){
  // payload - decoded jwt token (user.id and timestamp)
  // done - callback function, tell passport if the user is authenticated or not

  // see if the user id in the payload exists in the db
  User.find(payload.sub, function(err, user){
    if(err) {return done(err, false);} // false because we did not find a user object
    if(user){
      // if so, call done with that user object
      done(null, user);
    }else{
      // otherwise, call done without a user object
      done(null, false);
    }
  });
});

// tell passport to use this strategy
passport.user(jwtLogin);
