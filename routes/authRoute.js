const { userRegister, userLogin } = require("../controller/auth/authController")

const router=require("express").Router()

router.route("/register").post(userRegister)

router.route("/login").post(userLogin)


module.exports=router