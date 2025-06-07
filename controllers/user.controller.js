const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

require('dotenv').config()

const signUp =async (req,res,next)=>{
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status:"Success",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            Message:error
        })
    }
}
const getAllUsers =async (req,res,next)=>{
    try {
        const users = await User.find()
        res.status(200).json({
            status:"success",
            data:users
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            Message:error
        })
    }
}
const updateUser =async (req,res,next)=>{
    try {
        const {id} = req.params;
        const user = await User.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        res.status(200).json({
            status:"success",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            Message:error
        })
    }
}
const deleteUser =async (req,res,next)=>{
    try {
        const {id} = req.params;
        const user = await User.deleteOne({_id:id});
        res.status(200).json({
            status:"Success",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            Message:error
        })
    }
}
const deleteAllUsers =async (req,res,next)=>{
    try {
        const users = await User.deleteMany();
        res.status(200).json({
            status:'Success',
            data:users
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}
const login =async (req,res,next)=>{
    try {
        const {userName,password} = req?.body;
        if(!userName||!password){
            return res.status(400).json({
                status:"failed",
                message:"Username And Password Required"
            });
        }

        const user = await User.findOne({userName:userName})
        if(!user){
            return res.status(400).json({
                status:"Failed",
                message:"Username Or Password Not Correct"
            });
        }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if(isCorrectPassword){
            const token = jwt.sign(
                {userName:user.userName,id:user._id},
                process.env.JWT_SECRIT,
                {expiresIn:'1d'}
            );
            return res.status(200).json({
                status:"Success",
                data:token
            })
        }else {
            return res.status(400).json({
                status:"Failed",
                message:"Username Or Password Not Correct"
            });
        }
        
    } catch (error) {
        console.log("login Error : ",error)
        return res.status(400).json({
            status:"Failed",
            message:error
        });
    }
}

module.exports = {
    signUp,
    getAllUsers,
    updateUser,
    deleteAllUsers,
    deleteUser,
    login
}