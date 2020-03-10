const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check , validationResult} = require('express-validator');

const User = require('../../models/Users');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth , async(req , res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
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
        check('username', 'Please include a valid username').not().isEmpty(),
        check('password','Password is required').exists()
    ],
    async (req , res) => {
        const errors = validationResult(req);

        //if above 2 check show errors, following will display 
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() });
        }
        const {username , password} = req.body;

        try{
            //see if user exists
            let user = await User.findOne({ username});
            if(!user){
                return res
                        .status(400)
                        .json({ errors:[{ msg : 'Invalid Credentials'}]});
            }

            const isMatch = await bcrypt.compare(password , user.password);

            if(!isMatch){
                return res  
                        .status(400)
                        .json({ errors : [{ msg: 'Invalid Credentials'}]})
            }
            //return jsonwebtoken
            const payload ={
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwttoken'),
                { expiresIn : 36000},
                ( err, token ) => {
                    if(err) throw err;
                    res.json({token});
                }
            );
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;

