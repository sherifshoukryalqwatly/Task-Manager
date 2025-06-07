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
        const tasks =await Task.find();
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
        const task = await Task.findOne({_id:id});
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

const findTaskByTitle =async (req,res,next)=>{
    try {
        const {title} = req?.query
        const query={}
        if(title){
            query.title = {$regex:new RegExp(title,'i')};
        }
        const tasks = await Task.find(qurey);
        res.status(200).json({
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
    findTaskByTitle,
    filterTask
}
