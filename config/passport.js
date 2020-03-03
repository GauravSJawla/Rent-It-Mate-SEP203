var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			//options for strategy.
			clientID: "581147043633-1g3cekfmtrg0kqan00mjmt2ht802om7i.apps.googleusercontent.com",
			clientSecret: "AVwJjPFFTRFV17iOh0bss86a",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},

		function(accessToken, refreshToken, profile, done) {
			// var userData = {
			// 	email: profile.emails[0].value,
			// 	name: profile.displayName,
			// 	token: accessToken
			// };
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			  });
			done(null, userData);
		}
	)
);