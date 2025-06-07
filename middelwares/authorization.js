const User = require("../models/user.model.js")

const authorization = (roles=[])=>{
    return (req,res,next)=>{
        if(!req.user || !req.user.role){
            return res.status(400).json({
                status:"Failed",
                Message: "User Is Forbbiden"
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                status:"Failed",
                Message:"User Not Have Permissions"
            })
        }
        next();
    }
}

module.exports = authorization