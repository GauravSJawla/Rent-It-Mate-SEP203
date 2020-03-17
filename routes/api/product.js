const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator/check');
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../../helpers/dbErrorHandler');

router.get('/findById' , (req, res, next, id) => {
  Product.findById(id).exec( (err , product) =>{
    if( err || !product){
      return res.status(400).json({
        error: 'Product could not be found'
       });
    }
    req.product = product;
    next();
 
});
});

// @route   GET api/product/create
// @desc    Add a product
// @access  Private
router.get('/:id' , (req , res) =>{
  req.product.photo = undefined
  return res.json(req.product);
})
// @route   POST api/product/create
// @desc    Add a product
// @access  Private

router.post('/create', auth, (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req , (err, fields , files) =>{
      if(err){
        return res.status(400).json({
          error: 'Image could not be uploaded'
        })
      }
      //check for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (!name || !description || !price || !category || !quantity || !shipping) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }

      let product = new Product(fields);
      // 1kb = 1000
      // 1mb = 1000000

     if(files.photo){
       if(files.photo.size >1000000){
         return res.status(400).json({
           error :" Image should be less than 1mb in size"
         });
       }
       product.photo.data = fs.readFileSync(files.photo.path)
       product.photo.contentType = files.photo.type
     }
   
    product.save((err , result) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      console.log(result);
      res.json(result);
    });
  });
 
});



module.exports = router;
