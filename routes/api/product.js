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

// @route   POST api/product/create
// @desc    Add a product
// @access  Private

router.post('/create', auth, (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  // const { product_id ,name , description , price, category , quantity, sold, photo, shipping} = req.body;

  // try {
  //   let product = await Product.findOne({ product_id });

  //   if (product) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'product already exists!' }] });
  //   }
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

     if(files.photo){
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

// @route   GET api/products/
// @desc    get a product
// @access  Private

// router.get('/' , auth, async(req , res) =>{
//   const error = validationResult(req);
//   if(!errors.isEmpty()){
//     return res
//           .status(400)
//           .json({ errors:erros.array() });
//   }

 

// })

module.exports = router;
