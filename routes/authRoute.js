const { userRegister, userLogin, forgetPassword, verifyOtp, resetPassword } = require("../controller/auth/authController")

const router=require("express").Router()

router.route("/register").post(userRegister)

router.route("/login").post(userLogin)
router.route("/forgetPassword").post(forgetPassword)
router.route("/verifyOtp").post(verifyOtp)
router.route("/resetPassword").post(resetPassword)


module.exports=router