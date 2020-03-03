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
			clientID: "http://581147043633-ljpuh4hbrmts67ibaf9gf1gqajcfqi0j.apps.googleusercontent.com/",
			clientSecret: "WLkEhOihcGdFGw3-pd23_5V5",
			callbackURL: "http://localhost:5000/auth/google/callback"
		},

		function(accessToken, refreshToken, profile, done) {
			var userData = {
				email: profile.emails[0].value,
				name: profile.displayName,
				token: accessToken
			};
			done(null, userData);
		}
	)
);