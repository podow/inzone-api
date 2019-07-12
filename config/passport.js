const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Users } = require('../models');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'hash'
}, (email, hash, done) => {
  Users.findOne({ where: { email } })
    .then(user => {
      if (!user || !user.validatePassword(hash)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
