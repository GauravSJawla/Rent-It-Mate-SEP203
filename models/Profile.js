const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    Address: [
        {
            Address1:{
                type: String,
                required : true
            },
            Address2:{
                type: String
            },
            City:{
                type: String,
                required: true
            },
            State:{
                type: String,
                required:true
            },
            Country:{
                type: String,
                required : true
            },
            Zipcode:{
                type: Number,
                required: true
            }

        }    
    ],
    HomePhone:{
        type: Number,
        required: true
    },
    MobilePhone:{
        type: Number
    },
    AlternateEmail:{
        type: String
    },
    Role:{
        type: String,
        required: true
    },
    History:{
        type: Array,
        default: []
    },
    UpdatedDate:{
        type: Date,
        default : Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);