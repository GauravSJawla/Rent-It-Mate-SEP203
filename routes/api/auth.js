const express = require('express');
const config = require('config');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const { check , validationResult} = require('express-validator');

const User = require('../../models/Users');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/auth
//@desc Authenticate user and get token
//@access Public
router.post(
  '/',
  [
    check('username', 'Please include a valid username')
      .not()
      .isEmpty(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if above 2 check show errors, following will display
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwttoken'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/google
// @desc    Use passport.authenticate() as route middleware to authenticate the
//          request.  The first step in Google authentication will involve
//          redirecting the user to google.com.  After authorization, Google
//          will redirect the user back to this application at /auth/google/callback
// @access  Public
router.get(
  '/google',
  passport.authenticate('googleToken', {
    scope: ['profile', 'email']
  })
);

// @route   GET api/auth/auth/google/callback
// @desc    Use passport.authenticate() as route middleware to authenticate the
//          request.  If authentication fails, the user will be redirected back to the
//          login page.  Otherwise, the primary route function function will be called,
//          which, in this example, will redirect the user to the home page.
// @access  Public
router.get(
  '/google/callback',
  passport.authenticate('googleToken', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('You reached the callback');
    res.redirect('/dashboard');
  }
);

module.exports = router;
