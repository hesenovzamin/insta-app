
// models/User.js

import mongoose from 'mongoose'
// import moment from 'moment';

const dbuserSchema = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    phone : {
        type : String,
    },
    Date : {
        type : Date,
        default : Date.now,
        required : true
    },
    CreateToken : String,
    resetToken : String,
    resetTokenExpiration : Date,
    Password : {
        type : String,
    },
    Img : {
        type : String
    },
    IsActive : {
        type : Boolean,
        default : false
    },

    // cart: {
    //     products: [
    //         {
    //             productId: {
    //                 type: Number,
    //             },
    //             quantity: {
    //                 type: Number,
    //             },
    //         }
    //     ]
    // },


},{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

module.exports = mongoose.models.UserDb || mongoose.model('User', dbuserSchema)
