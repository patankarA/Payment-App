const express = require('express');

const { authMiddleware } = require('../middleware');

const { Account, Transactions } = require('../db')

const { default: mongoose} = require('mongoose');

const router = express.Router();



router.get("/balance", authMiddleware ,async (req,res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
         });
         return res.json({
            balance: account.balance
         }) 
        
    } catch (error) {
        console.log(error);
        res.json({msg:"error"});
    } 

})

router.post("/transfer",authMiddleware, async (req,res)=>{
    //if any step fails comes to initial phase. 
    //if yo comit it then everything will exicute not partially exicute.
    try {
        const session = await mongoose.startSession();
    
        session.startTransaction();
        const { amount, to } = req.body;

        //Fetch the accounts within the transaction
        const account = await Account.findOne({userId:req.userId}).session(session);

        if(!account || account.balance < amount)
        {
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Insufficient Balance"
            })
        }

        const toAccount = await Account.findOne({ userId: to}).session(session);

        if(!toAccount)
        {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        //Perform the tranfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        await Transactions.create({
            senderId:req.userId,
            reciverId:to,
            amount:amount
        });
        res.json({
            message: "Transfer successful"
        });
        

        } catch (error) {
            console.log(error);
            return res.status(200).json({
            msg:"ERROR",
            cause: error.msg,
        });
            
        }
        

})

module.exports = router;