const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const Product = require('../../models/Product');
const User = require('../../models/Users');
const Purchase = require('../../models/Purchase');
const Profile = require('../../models/Profile');
const profileRouter = require('./profile');
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../../helpers/dbErrorHandler');
/**
 * @route GET api/product/getMyProducts
 * @desc  This method is used to get all the products present on the site for the user.
 * @access public  
 */
router.get('/getMyProducts',auth ,  async (req, res) => {
  try {
    const products = await Product.find({
      userId : req.user.id
    })
    .select('-photo');
    res.json(products);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

/**
 * @route api/product/products
 *  sell / arrival
 * @description :by sell = /products?sortBy=sold&order=desc&limit=4
 *    by arrival = /products?sortBy=createdAt&order=desc&limit=4
 *    if no params are sent, then all products are returned
 */
router.get("/products", async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
      .select('-photo')
      .populate('SubCategory')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, products) => {
          if (err) {
            console.log(err);
              return res.status(400).json({
                  error: 'Products not found'
              });
          }
          res.json(products);
      });
});
/**
 * @description : it will find the products based on the req product category
 * other products that has the same category, will be returned
 * @access public
 */

router.get ( "/products/related/:productId",(req, res) => {
  console.log('inside product search',req.product.subcategory);
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  //products $ne = not including the req.product
  Product.find({ _id: {$ne : req.product} , subcategory: req.product.subcategory })
        .limit(limit)
        .populate('subcategory', ['_id','name'])
      .exec((err, products) => {
        console.log('product after query',products)
          if (err) {
              return res.status(400).json({
                  error: 'Products not found'
              });
          }
          res.json(products);
      });
});
/**
 * @route   GET api/product/:id
 * @desc    This method gets hit everytime there is productId in the url.
 *          The function of this method is to get the product by id and then follow 
 *          the application process.
 * @access  public
 */
router.param('productId' , async (req, res, next, id) => {
  await Product.findById(id)
  .exec( (err , product) =>{
    if( err || !product){
      /* istanbul ignore next */
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
    check('subcategory','please include a sub category')
    .not()
    .isEmpty(),
    check('quantity','please include quantity')
    .not()
    .isEmpty(),
    check('shipping','do you want to ship right now or not')
    .not()
    .isEmpty()
], auth, async (req, res) => {
  // let productResult, productName, productFromDate, productToDate;
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req , (err, fields , files) =>{
      if(err){
        /* istanbul ignore next */
        return res.status(400).json({
          error: 'Image could not be uploaded'
        })
      }

      
      const userId = req.user.id 
      const user = User.findById(userId)
      if(!user){
        /* istanbul ignore next */
        return res.status(404).json({
          error :' user not found'
        })
      }
      
      //check for all fields
      const { name, description, price, subcategory, quantity, shipping, fromDate, toDate, zipcode } = fields;
      console.log( name + description + price + subcategory + quantity + shipping + fromDate + toDate + zipcode + " the details");
      /* istanbul ignore next */
      if (!name || !description || !price || !subcategory || !quantity || !shipping ) {
        console.log('inside field check')
          return res.status(400).json({
              error: [{ msg: 'All fields are required' }]
          });
      }
      if(toDate <= fromDate){
        console.log('inside date check')
        return res.status(400).json({
          error: [{ msg: 'End date less than from date' }]
        });
      }

      let product = new Product(fields);
      product.userId = userId;
      // 1kb = 1000
      // 1mb = 1000000

     if(files.photo){
       /* istanbul ignore next */
       if(files.photo.size >1000000){
         console.log(' inside greater size')
         return res.status(400).json({
           error :" Image should be less than 1mb in size"
         });
       }
       product.photo.data = fs.readFileSync(files.photo.path)
       product.photo.contentType = files.photo.type
     }

     //var profileResult = profileRouter.post(`/update-profile/${name}/${fromDate}/${toDate}/${userId}`);
    
    product.save((err , result) => {
      /* istanbul ignore next */
      if(err){
        console.log(err)
        return res.status(400).json({
          error: 'sorry try again later'
        });
      }
    //  let profileResult = addHistoryToProfile(name,fromDate,toDate,userId);

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
router.delete('/:productId' , auth , async (req , res) =>{
  let product = req.product
  let userId = req.user.id
  const user = User.findById(userId)
  // const purchaseForProductCount = await Purchase.find({productId: req.product._id}).countDocuments();
  // if(purchaseForProductCount > 0){
  //   return res.json({msg:'Product cannot be deleted'});
  // }
    await product.remove( (err) =>{
      /* istanbul ignore next */
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
 * @route   GET api/product/photo/:id
 * @desc    get a photo
 * any get request with product id comes to this method
 * and it then follows to the router.param which checks for the parameter 
 * and then returns the product and moves on to next() application flow.
 * @access  public 
 */
router.get('/photo/:productId',(req , res, next) =>{
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
}
next();
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
         /* istanbul ignore next */
        return res.status(400).json({
          error: 'Image could not be uploaded'
        })
      }
      let userId = req.user.id
      const user = User.findById(userId)
       /* istanbul ignore next */
      if(!user){
        return res.status(400).json({
          error :  'user not found try with different credentials'
        })
      }
      
      /**
       * check for all fields
       */
      const { name, description, price, subcategory, quantity, shipping } = fields;
      console.log( name + description + price + subcategory + quantity + shipping + " the details");
      if (!name || !description || !price || !subcategory || !quantity || !shipping ) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }
        let product = req.product;
        product.userId = userId
        product = _.extend(product , fields)

      /**  1kb = 1000
       *   1mb = 1000000
      */
      /* istanbul ignore next */
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
         /* istanbul ignore next */
        if (err) {
          console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
       // console.log('update result '+ result)
        res.json(result);
      
      });
  });
});



module.exports = router;
