const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session false --> no cookie
const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app){
  app.get('/', requireAuth, function(req, res){
    res.send({hi: 'hi'});
  })
  app.post('/signup', Authentication.signup);
}
