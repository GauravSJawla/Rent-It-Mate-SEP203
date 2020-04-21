const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check} = require('express-validator');
const product = require('../../models/Product');
const user = require('../../models/Users');
const purchase = require('../../models/Purchase');

// @route Post api/product with productId as query parameter
// @desc Adds the purchase of the corresponding user 
//        into the purchase collection for the mentioned start and end dates
// @access Private

router.post('/',[
    auth,[
        check('fromDate','Please select a start date')
    .not()
    .isEmpty(),
    check('toDate', 'Please select an end date')
    .not()
    .isEmpty()
    ]
    
],
  async (req,res) => {
        const userRented = await user.findById({_id:req.user.id});
        const userRentedId = userRented._id;
        const productId = req.query.productId;
        const productRented = await product.findById({_id: productId});
        if(productRented){
            const fromDate = req.body.fromDate;
            const toDate = req.body.toDate;
            const purchaseFields = {};
            purchaseFields.productId = productId;
            purchaseFields.userId = userRentedId;
            purchaseFields.fromDate = fromDate;
            purchaseFields.toDate = toDate;
            try{
               let purchase = new Purchase(purchaseFields);
                await purchase.save();
                return res.json(purchase);
            }
            catch(err){
                res.status(500).send('server error');
            }   
        }
});


// @route get api/purchase along with productId as query parameter
// @desc Returns all the corresponding purchases for the provided productId
// @access Private

router.get('/', auth, async(req,res) => {
    const productId = req.query.productId;
    const purchaseResult = await purchase.find({productId: productId});
    return res.json(purchaseResult);
})

module.exports = router;