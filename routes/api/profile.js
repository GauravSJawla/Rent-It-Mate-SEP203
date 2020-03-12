const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const profile = require('../../models/Profile');
const user = require('../../models/Users');

// @route GET api/profile/me
// @desc get current user profile
// @access Private

router.get('/me', auth, async(req,res) => {
    try{
        const userProfile = await profile.findOne({user: req.user.id}).populate(
            'user',['name','email']
        );
        if(!userProfile){
            return res.status(400).json({msg: 'You are yet to create your profile'});
        }
        res.json(userProfile);

    }
    catch(err){
        console.err(err.message);
        res.status(500).send('server error');  
    }  
})


// @route Post api/profile
// @desc Add it to profile database
// @access private
module.exports = router;
