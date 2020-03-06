const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check } = require('express-validator/check');
//Import packages to send emails
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
//Import user model
const Users = require('../../models/Users');
const frontend = process.env.PORT || 3000;
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: config.get('sendGridAPIKey')
  }
}));

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
    let user,host, link;
    const { name, username, email, password} = req.body;
    try{
        user = await Users.findOne({email});
        if(user){
            return res.status(400).json({error: [{msg: 'User already exists'}]});
        }
        const payload ={
          user: {
              id: name
          }
      };
        user = new Users({
          name : name,
          username : username,
          email : email,
          password: password,
          temporarytoken : jwt.sign(payload, config.get('jwttoken'), {
            expiresIn: 86400  // expires in a day
          })
         });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        const result = await user.save();
        host = req.get('host');
        link="http://"+req.get('host')+"/api/users/verify?id="+result.temporarytoken;
        const emailObject = {
           from: "rent-it-mate@node-complete.com",
           to: result.email,
           subject : "Please verify your account",
           text : `Hello ${
               result.name
               }, Please click on the following link`,
           html: "Hello,<br> Please Click on the link to verify your email.<br> "+
              "<a href="+link+">Click here to verify</a>"
        };
       const sentEmail = transporter.sendMail(emailObject,function(err, info){
         if(err){
           console.log(err);
         }
         else{
           console.log("Verification Link sent -  : " + info.response);
         }
       });
      res.json({
        success: true,
        message: 'Email sent'
    });
        res.json(result);

    }
    catch(err){
        console.error(err.message);

    }   
 }
  
);
router.get("/verify",
(req,res) => {
  let user;
  Users.findOne({temporarytoken: req.query.id}, (err,user) =>{
    if(err) throw err;
    const token = req.query.id;
    jwt.verify(token,config.get('jwttoken'), (err,decoded)=>{
      if(err){
        res.json({success:false, message: "Activation Link is expired"});
      }
      else if(!user){
        res.json({success:false, message: "Activation Link is expired"});
      }
      else{
        user.temporarytoken = false;
        user.verifiedStatus = true;
        user.save(err => {
          if(err){
            console.log(err);
          }
          else{
            const emailObject = {
              from: "rent-it-mate@node-complete.com",
              to: user.email,
              subject : "Account Activated",
              text : `Hello ${
                user.name
                }, Your account has been successfully activated!`,
              html: `Hello<strong> ${
                user.name
                }</strong>,<br><br>Your account has been successfully activated!`
            };
            transporter.sendMail(emailObject,function(err, info){
              if(err){
                console.log(err);
              }
              else{
                console.log("Activation Message Confirmation -  : " + info.response
                );
              }
            });
            if(frontend == 3000){
              res.redirect('http://localhost:' + frontend + '/login');
            
            }
            if( frontend == process.env.PORT){
              res.redirect(frontend+'/login');
            }
            
            
          }
        });
      }
    });
  } );
});


module.exports = router;