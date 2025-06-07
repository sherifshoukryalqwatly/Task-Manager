const { json } = require('express');
const Task = require('../models/task.model.js');

const createTask = async (req,res,next)=>{
    try {
        req.body.userId = req.user._id;
        const task = await Task.create(req.body);
        res.status(201).json({
            status:"success",
            data:task
        });
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            Message:error
        });
    }
}

const updateTask = async (req,res,next)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const task = await Task.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        console.log(task)
        res.status(200).json({
            status:"success",
            data:task
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}

const deleteTask =async (req,res,next)=>{
    try {
        const {id} = req.params;
        const task =  await Task.deleteOne({_id:id});
        res.status(200).json({
            status:"success",
            data:task
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}

const deleteAllTask =async (req,res,next)=>{
    try {
        const tasks = await Task.deleteMany({userId:req.user._id});
        res.status(200).json({
            status:"success",
            data:tasks
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}
const getAllTasks =async (req,res,next)=>{
    try {
        const page = parseInt(req.query.page);
        const limit = 5;
        const skip = (page-1)*limit;

        const tasks =await Task.find({userId:req.user._id}).skip(skip).limit(limit);
        res.status(200).json({
            status:"success",
            data:tasks,
        })
        
    } catch (error) {
        res.status(400),json({
            status:"Faild",
            message:error
        })
    }
}
const getTaskById =async (req,res,next)=>{
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id:id}).populate('userId');
        res.status(200).json({
            status:"success",
            data:task
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}

const findTask =async (req,res,next)=>{
    try {
        const {search} = req.query;
        const tasks =await Task.find({
            userId:req.user._id,
            $or:[
                {title:{$regex:search,$options:'i'}},
                {describtion:{$regex:search,$options:'i'}},
                {catigory:{$regex:search,$options:'i'}}
            ]
        })
        return res.status(200).json({
            status:"success",
            tasksLength:tasks.length,
            data:tasks
        })
    } catch (error) {
        res.status(400).json({
            status:"Faild",
            message:error
        })
    }
}
const filterTask =async (req,res,next)=>{
    try {
        const {category, priority, status} = req.query;
        let filter = {userId:req.user._id};
        if(category){
            filter.category = category
        }
        if(priority){
            filter.priority = priority
        }
        if(status){
            filter.status = status
        }
        const tasks = await Task.find(filter);
        if(!tasks){
            return res.status(400).json({
                status:"Failed",
                Message:"Not Found"
            })
        }
        return res.status(200).json({
            status:"Success",
            Tasks:tasks
        });
        
    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            Message:error
        })
    }
}
module.exports = {
    createTask,
    updateTask,
    deleteAllTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    findTask,
    filterTask
}
