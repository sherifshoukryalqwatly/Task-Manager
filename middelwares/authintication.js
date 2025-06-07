const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const auth = async (req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(400).json({
            Message:"Token Is Requierd"
        }
        )
    }
    const payload = jwt.verify(authorization,process.env.JWT_SECRIT);

    const user = await User.findOne({userName:payload.userName});

    if(!user) {
        return res.status(400).json({
            Message: "User Not Found"
        })
    }

    req.user = user;

    next();
}

module.exports = auth;