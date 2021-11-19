const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.signInRequired = (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    else{
        return res.status(500).json({
            message: "Auth required"
        })
    }
}

// client -> req ()