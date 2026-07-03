const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model.js") 


async function authUser(req,res,next){

    const isTokenBlacklisted = await tokenBlackListModel.findOne({token: req.cookies.token})
    
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token blacklisted, Please login again"
        })
    }


    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        
        req.user =decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    
} 


module.exports = authUser