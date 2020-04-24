const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    address: 
        {
            address1:{
                type: String,
                //required : true
            },
            address2:{
                type: String
            },
            city:{
                type: String,
                //required: true
            },
            state:{
                type: String,
                //required:true
            },
            country:{
                type: String,
               // required : true
            },
            zipcode:{
                type: Number,
                //required: true
            }

        },
    homePhone:{
        type: Number,
       // required:true
    },
    mobilePhone:{
        type: Number
    },
    alternateEmail:{
        type: String
    },
    history:{
       addedProducts:{
           type: Array,
           default:[]
       },
       rentedProducts:{
           type:Array,
           default:[]
       }
    },
    updatedDate:{
        type: Date,
        default : Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);