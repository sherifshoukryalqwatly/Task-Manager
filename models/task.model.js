const mongoose = require('mongoose');
const { options } = require('../routes/task.route.js');

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
        default:"personal"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:[true,"UserID Is required"]
    }
},{
    toJSON:{
        transform:(doc,ret,options)=>{
            delete ret.__v;
        }
    }
}) 

const Task = mongoose.model('Task',taskSchema);

module.exports= Task;