const User = require('../models/user'); // contains all users in the db

exports.signup = function(req, res, next){

  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: 'you must provide email and password'});
  }
  console.log(email, password);
  // see if a user already exists
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
        res.json(user);
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
