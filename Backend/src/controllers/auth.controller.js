const userModel = require("../models/user.model.js")
const tokenBlackListModel= require("../models/blacklist.model.js") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/**
 * @name registerUserController
 * @description register a new user
 * @access Public
 */
async function registerUserController(req,res){
    const {username ,email, password}= req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide email , username and password"
        })
    }

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or:[{username},{email }]
        }
    )

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exist"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password : hash 
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(201).json(
        {
            message:"User registered successfully",
            user: {
                username:user.username,
                email:user.email,
                _id:user._id
            }   
        }
    )

}

/**
 * @name loginUserController
 * @description login a user
 * @access Public
 */
async function loginUserController(req,res){
    const {email,password}= req.body

    if(!email || !password){
        return res.status(400).json({
            message:"Please provide email and password"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username,

    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            _id:user._id
        }
    })
    
}

/**
 * @name logoutUserController
 * @description logout a user
 * @access Public
 */
async function logoutUserController(req,res){
 
    const userLoggedIntoken = req.cookies.token



    if(userLoggedIntoken){
        const blacklisttoken = await tokenBlackListModel.create({
            token: userLoggedIntoken
        })

        return res.status(200).clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json({
            message:"User logged out successfully"
        })
    }


    return res.status(400).json({
        message:"No user logged in"
    })
}

/**
 * @name getLoggedInUserProfile
 * @description get user profile
 * @access Private
 */
async function getLoggedInUserProfile(req,res){
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message:"User profile fetched successfully",
        user:{
            username:user.username,
            email:user.email,
            _id:user._id
        }
    })
}

module.exports = {registerUserController,
    loginUserController,
    logoutUserController,
    getLoggedInUserProfile}