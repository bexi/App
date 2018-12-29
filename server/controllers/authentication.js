const User = require('../models/user'); // contains all users in the db
const jwt = require('jwt-simple');
const config = require('../config.js');

// TODO: make into promise and axois

function tokenForUser(user){
  const timestamp = new Date().getTime();
  // sub - subject of the token
  // obs. the config.secret should never be public!
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd by the local passport strategy
  // Passport sets the user to the request object
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

// TODO: check that email is correct and password have a good length
exports.signup = function(req, res, next){

  const email = req.body.email;
  const password = req.body.password;

  // see if input is ok
  if(!email || !password){
    return res.status(422).send({error: 'you must provide email and password'});
  }
  console.log(email, password);

  // see if a user already exists
  // User is the class of all users in the db
  User.findOne({ email: email}, function(err, existingUser){
      if(err) {return next(err);}
      // if so, send error
      if(existingUser){
        return res.status(422).send({error: 'email is in use'});
      }
      // if not create and save new user
      const user = new User({
        email: email,
        password: password
      });
      // save new user to db
      user.save(function(err){
        console.log('in save');
        // respond to request
        if(err) { return next(err)}
        res.json({token: tokenForUser(user)});
      });
  });


}

/*
Example body
{
  email: 'rebecka@msn.com',
  password: '123'
}

*/
