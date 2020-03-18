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

router.param('productId' , (req, res, next, id) => {
 // console.log('inside product get by id'+id+' console '+JSON.stringify(Product.findById(id)));
  Product.findById(id)
  .exec( (err , product) =>{
    if( err || !product){
      return res.status(400).json({
       
        error: 'Product could not be found'
       });
    }
    req.product = product;
    next();
 
});
});

// @route   GET api/product/:id
// @desc    get a product
// @access  public
/**
 * any get request with product id comes to this method
 * and it then follows to the router.param which checks for the parameter 
 * and then returns the product and moves on to next() application flow.
 */
router.get('/:productId',(req , res) =>{
  console.log(req.product);
  req.product.photo = undefined
  return res.json(req.product);
})
/**
 * @route api/product/create
 * @desc This method is used to create a product using form-data and not json.
 *       While testing with postman always use key-value pairs to test the API 
 *       for this method.
 *      
 */
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

      // if (!name || !description || !price || !category || !quantity || !shipping) {
      //     return res.status(400).json({
      //         error: 'All fields are required'
      //     });
      // }

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
/** 
 *  @route DELETE api/product
 *  @desc This method is responsible for deleting a product from
  *        the database
*/
router.delete('/:productId/:username' , auth , async (req , res) =>{
  let product = req.product
  await product.remove( (err) =>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message:'product deleted successfully'
    })
  })
})

/**
 * @route PUT/UPDATE api/product
 * @desc  This method is used to update the products entered by the user
 *        
 */
router.put('/:productId', auth, (req, res)=>{
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

      // if (!name || !description || !price || !category || !quantity || !shipping) {
      //     return res.status(400).json({
      //         error: 'All fields are required'
      //     });
      // }
      try{
        let product = req.product;
        product = _.extend(product , fields)
      
     

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
    }catch (err) {
      console.log(err)
      return res.status(500).json({
        
        message : 'update not successful'         
      })
    }
    });
  });

module.exports = router;
