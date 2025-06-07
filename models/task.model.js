const mongoose = require('mongoose');

const {Schema}= mongoose;

const taskSchema =new Schema({
    title:{
        type:String,
        required: [true,"Task Must have Title"]
    },
    describtion: {
        type:String,
    },
    due_date: {
        type:Date,
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        defaultL:"low",
    },
    status: {
        type:String,
        enum:['Pending','in-progress','Completed'],
        default:"pending"
    },
    catigory: {
        type:String,
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:[true,"UserID Is required"]
    }
}) 

const Task = mongoose.model('Task',taskSchema);

module.exports= Task;