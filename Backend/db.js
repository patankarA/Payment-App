const mongoose = require('mongoose');

async function connectToDatabase(){
    try {
        await mongoose.connect('mongodb+srv://new_user18:user123@cluster0.bazvvyc.mongodb.net/PaymentApp');
        console.log("database is connected")
    } catch (error) {
        console.log(error);
        throw new Error("Could not Connect to database");
    }
}
connectToDatabase();

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

//defing  Schema for transition history

const transitionsSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
});


//creating model for userSchema
const User = mongoose.model('User',userSchema);

//creating model for accountSchema
const Account = mongoose.model('Account',accountSchema);

//
const Transactions  = mongoose.model('Transactions',transitionsSchema);

//export
module.exports = {
    User,
    Account,
    Transactions
};
