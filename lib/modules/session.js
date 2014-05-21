var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/user')
  , DB = require('../helpers/db');

exports.initialize = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function (email, password, done) {
      // e.g. check user/pass, then...
      console.log(email);
      return done(null, { id: 0, email: 'foo' });
    })
  );

  // what to return back to browser
  passport.serializeUser(function (user, done) {
    console.log(user.email);
    done(null, true);
  });

  // what to load from DB based on browser request
  passport.deserializeUser(function (id, done) {
    console.log(id);
    
    // fetch user from DB
    done(null, { email: 'foo', password: 'hashed password' });
  });

  // Routes
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  // login page
  app.get('/login', function (req, res) {
    res.send('example login page');
  });
};