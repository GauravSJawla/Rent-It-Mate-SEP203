const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const {check } = require('express-validator/check');

const Users = require('../../models/Users');

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Users route'));

//@route Post api/users
//@desc Register User
//@access Public

router.post(
    '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async(req,res) => {
  
    const { name, username, email, password} = req.body;
    try{
        let user = await Users.findOne({email});
        if(user){
            return res.status(400).json({error: [{msg: 'User already exists'}]});
        }
        user = new Users({name,username,email,password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        const result = await user.save();
        res.json(result);

    }
    catch(err){
        console.error(err.message);

    }   
 }
  
);

module.exports = router;
