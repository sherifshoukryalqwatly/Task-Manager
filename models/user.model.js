const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: [true, "User Must have First Name"]
    },
    lastName: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: [true, "User Must have Last Name"]
    },
    userName: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: [true, "User Must have User Name"],
    unique: true
    },
    password: {
    type: String,
    minlength: 3,
    required: [true, "User Must have Password"]
    },
    role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: [true, "User Must Have Role"]
    }  
},{
    toJSON:{
        transform:(doc,ret,options)=>{
            delete ret.password;
            delete ret.__v;
        }
    }
});

// Correct pre-save hook
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
