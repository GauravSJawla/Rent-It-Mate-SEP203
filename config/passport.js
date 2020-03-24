var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config');
const googleClientID = config.get('googleClientID');
const googleClientSecret = config.get('googleClientSecret');

/**
 * This is used to do Google Oauth v2 authentication asynchronously.
 *
 */

passport.use(
  'googleToken',
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/api/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done) {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
      console.log('done', done);
    }
  )
);
