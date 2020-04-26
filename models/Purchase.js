const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    productName:{
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    fromDate:{
        type: Date,
        required: true
    },
    toDate:{
        type: Date,
        required: true
    },
    updatedDate:{
        type: Date,
        default : Date.now
    }
    
});

module.exports = Purchase = mongoose.model('purchase', PurchaseSchema);
