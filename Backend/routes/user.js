const express = require('express');

const { User , Account } = require('../db');

const router = express.Router();

const zod = require('zod');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../config");

const { authMiddleware } = require('../middleware');

const { Sequelize } = require('sequelize');

//*****************SignUp**********************//

//create the zod Schema
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup", async( req , res )=>{
    try {
        //check errors in input given by user
        const { success } = signupBody.safeParse(req.body)
        if(!success)
        {
            console.log(success);
            return res.status(411).json({
                msg:"Incorrect Inputs!"
            })
        }
        //check if user is already exists or not
        const userExist =await User.findOne({
            //username: req.body.username
            where: { username: req.body.username }
        });
        if(userExist)
        {
            return res.status(400).json({
                msg:"User already exists."
            })
        }
        //if not then
        //save user information in DataBase
        const user = await User.create({
            username : req.body.username,
            password : req.body.password,
            firstName : req.body.firstName,
            lastName : req.body.lastName
        });

        const userId = user.id;

        //create bank account in DataBase
        await Account.create({
            userId: user.id,
            balance: Math.floor(1 + Math.random()*1000)
        })
    
        //create the token
        // const token = jwt.sign({
        //     userId
        // },JWT_SECRET)

        return res.json({
            msg:"user created successfully."
            //token:token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            msg:"ERROR",
            cause: error.msg,
        })
        
    }


})

//*****************SignIn*****************//

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post("/signin",async (req ,res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            msg:"Incorrect inputs"
        })
    }
    //find user info in DB
    const user = await User.findOne({
        //username : req.body.username,
        //password : req.body.password
        where: { username: req.body.username, password: req.body.password }
    });
    if(!user)
    {
        return res.json({
            msg:"user don't have account. Please signup!"
        })
    }
    //if exists


    //
    // const token = jwt.sign({
    //     userId:user.idN
    // }, JWT_SECRET);

    // res.json({
    //     msg:"user signin successfully.",
    //     token:token
    // })
})

//*****************Update*********************//

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put("/" , authMiddleware , async (req,res) =>{
    try {
        //const {success} = updateBody.safeParse(req.body)
        //if(!success)
        const validation = updateBody.safeParse(req.body);
        if (!validation.success)
        {
            return res.status(411).json({
                msg:"Error while updataing information "
            })
        }
        const filter = {where :{ _id: req.userId}};
        const update = {
            password : req.body.password,
            firstName : req.body.firstName,
            lastName : req.body.lastName, 
         }

        await User.findOneAndUpdate(filter, update , {new: true});

        res.json({
            msg:"Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            msg:"ERROR",
            cause: error.msg,
        })
    }

})


//**************Finding User*****************//

router.get("/bulk",async (req,res) => {
    const filter = req.query.filter || "";
    // const users = await User.find({
    //     $or: [{
    //         firstName: {
    //             "$regex": filter
    //         }
    //     }, {
    //         lastName: {
    //             "$regex": filter
    //         }
    //     }]
    // })
    const users = await User.findAll({
        where: {
            [Sequelize.Op.or]: [
                { firstName: { [Sequelize.Op.like]: `%${filter}%` } },
                { lastName: { [Sequelize.Op.like]: `%${filter}%` } }
            ]
        }
    });
    res.json({
        user:users.map(user => ({
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;