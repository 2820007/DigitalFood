const { userRegister, userLogin, forgetPassword } = require("../controller/auth/authController")

const router=require("express").Router()

router.route("/register").post(userRegister)

router.route("/login").post(userLogin)
router.route("/forgetPassword").post(forgetPassword)


module.exports=router