const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const Product = require('../../models/Product');
const User = require('../../models/Users');
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../../helpers/dbErrorHandler');

/**
 * @route   GET api/product/:id
 * @desc    This method gets hit everytime there is productId in the url.
 *          The function of this method is to get the product by id and then follow 
 *          the application process.
 * @access  public
 */
router.param('productId' , (req, res, next, id) => {
  //console.log('inside product get by id'+id+' console '+JSON.stringify(Product.findById(id)));
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


/**
 * @route   GET api/product/:id
 * @desc    get a product
 * any get request with product id comes to this method
 * and it then follows to the router.param which checks for the parameter 
 * and then returns the product and moves on to next() application flow.
 * @access  public 
 */
router.get('/:productId',(req , res) =>{
  console.log(req.product+' inside get');
  req.product.photo = undefined
  return res.json(req.product);
})

/**
 * @route api/product/create
 * @desc This method is used to create a product using form-data and not json.
 *       While testing with postman always use key-value pairs to test the API 
 *       for this method.
 * @access  private  
 */
router.post('/create',[
    check('name','please include a product name')
    .not()
    .isEmpty(),
    check('description','please include a descriptiom')
    .not()
    .isEmpty(),
    check('price','please include a price')
    .not()
    .isEmpty(),
    check('category','please include a category')
    .not()
    .isEmpty(),
    check('quantity','please include quantity')
    .not()
    .isEmpty(),
    check('shipping','do you want to ship right now or not')
    .not()
    .isEmpty()
], auth, (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req , (err, fields , files) =>{
      if(err){
        return res.status(400).json({
          error: 'Image could not be uploaded'
        })
      }
      
      //check for all fields
      const { name, description, price, category, quantity, shipping , username } = fields;

      if (!name || !description || !price || !category || !quantity || !shipping || !username) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }

      let product = new Product(fields);
      // 1kb = 1000
      // 1mb = 1000000

     if(files.photo){
       if(files.photo.size >1000000){
         console.log(' inside greater size')
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
      res.json(result);
    });
  });
 
});
/** 
 *  @route DELETE api/product
 *  @desc This method is responsible for deleting a product from
 *        the database
 * @access private
*/
router.delete('/:productId/:username' , auth , async (req , res) =>{
  let product = req.product
  const user = await User.findOne({
    username : req.params.username
  })
  if(!user){
    return res.status(400).json({
      error :  'user not found'
    })
  }
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
 * @route PUT/UPDATE api/product/:productId
 * @desc  This method is used to update the products entered by the user. It 
 *        uses the product that came with the request and persists it to the database.
 * @access private       
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
      /**
       * check for all fields
       */
      const { name, description, price, category, quantity, shipping , username} = fields;
      if (!name || !description || !price || !category || !quantity || !shipping || !username) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }
        let product = req.product;
        product = _.extend(product , fields)
      
     

      /**  1kb = 1000
       *   1mb = 1000000
      */
      if(files.photo){
       if(files.photo.size >1000000){
         return res.status(400).json({
           error :" Image should be less than 1mb in size"
         });
       }
       product.photo.data = fs.readFileSync(files.photo.path)
       product.photo.contentType = files.photo.type
      }

      product.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log('update result '+ result)
        res.json(result);
      
      });
  });
});
module.exports = router;
