const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check} = require('express-validator');
const product = require('../../models/Product');
const user = require('../../models/Users');
const profile = require('../../models/Profile');
const purchase = require('../../models/Purchase');

// @route Post api/product with productId as query parameter
// @desc Adds the purchase of the corresponding user 
//        into the purchase collection for the mentioned start and end dates
// @access Private

router.post('/:productId',[
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
        let result = await Profile.find({user:req.user.id});
        console.log('query product id', req.params.productId);
        const productId = req.params.productId;
        const productRented = await product.findById({_id: productId});
        if(productRented){
            const fromDate = req.body.fromDate;
            const toDate = req.body.toDate;
            const purchaseFields = {};
            purchaseFields.productId = productId;
            purchaseFields.productName = productRented.name;
            purchaseFields.userId = userRentedId;
            purchaseFields.fromDate = fromDate;
            purchaseFields.toDate = toDate;
            try{
               let purchase = new Purchase(purchaseFields);
                await purchase.save();
                const profileValue = Object.assign({},result);
                console.log('prfoile value',profileValue)
                if(productRented.name !== undefined && fromDate !== undefined && toDate !== undefined){
                    if(Object.keys(profileValue).length === 0){
                        console.log('inside no profile')
                        const profileFields = {};
                        profileFields.user = req.user.id;
                        profileFields.history = {};
                        profileFields.history.rentedProducts= [];
                        profileFields.history.rentedProducts = [
                                                {name: productRented.name, 
                                                 fromDate :fromDate, 
                                                 toDate : toDate}];
                        console.log('added profile fields',profileFields);
                        const profile = new Profile(profileFields); 
                        addHistory = await profile.save();
                        console.log('adding for no profile',addHistory);
                    }
                else{
                if(profileValue[Object.keys(profileValue)[0]].history.rentedProducts !== null){
                        console.log('inisde add history entry', productRented.name,fromDate,toDate)
                        console.log('inside add history entry')
                        addHistory = await Profile.updateMany({user:req.user.id},
                            {$push : {'history.rentedProducts' : [
                                                        {  name:productRented.name, 
                                                           fromDate: fromDate,
                                                           toDate: toDate}
                                ] }
                            });
                        console.log('add hostory in push', addHistory);
                    }
                // else{
                //     console.log('inside no history opresent for the user')
                //     addHistory =  await Profile.updateMany({user:req.user.id},
                //             {$set: {history: {rentedProducts : {
                //                             name:productRented.name,
                //                             fromDate:fromDate,
                //                             toDate:toDate
                //         }}}});
                //     }
             }
        
             }
                return res.json(purchase);
            }
            
            catch(err){
                //console.log(err);
                /* istanbul ignore next */
                res.status(500).send('server error');
            }   
        }
});


// @route get api/purchase along with productId as query parameter
// @desc Returns all the corresponding purchases for the provided productId
// @access Private

router.get('/:productId', auth, async(req,res) => {
    const productId = req.params.productId;
    const purchaseResult = await purchase.find({productId: productId,userId:req.user.id});
    return res.json(purchaseResult);
})

module.exports = router;