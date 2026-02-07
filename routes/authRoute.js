const { userRegister, userLogin, forgetPassword, verifyOtp, resetPassword } = require("../controller/auth/authController")
const catchAsync = require("../services/catchAsync")

const router=require("express").Router()

router.route("/register").post( catchAsync(userRegister) )

router.route("/login").post(catchAsync(userLogin))
router.route("/forgetPassword").post(catchAsync(forgetPassword))
router.route("/verifyOtp").post(catchAsync(verifyOtp))
router.route("/resetPassword").post(catchAsync(resetPassword))


module.exports=router