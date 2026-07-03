const { Router } = require('express')
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middleware/auth.middleware.js")


const authRouter = Router()

/** 
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
*/
authRouter.post("/register",authController.registerUserController)

/**
 * @route POST api/auth/login
 * @description Login user
 * @access Public
*/
authRouter.post("/login",authController.loginUserController)

/**
 * @route POST api/auth/logout
 * @description logout
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)


/**
 * @route GET api/auth/get-me
 * @description get user profile
 * @access private
 */
authRouter.get("/get-me",authMiddleware,authController.getLoggedInUserProfile)

module.exports = authRouter

