const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new_user18:user123@cluster0.bazvvyc.mongodb.net/PaymentApp');

//defining Schema for users

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
});

//defing Schema for account

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

//creating model for userSchema
const User = mongoose.model('User',userSchema);

//creating model for accountSchema
const Account = mongoose.model('Account',accountSchema);

//export
module.exports = {
    User,
    Account
};
