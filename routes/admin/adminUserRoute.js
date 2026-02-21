const { getUsers, deleteUser } = require("../../controller/admin/users/adminUsers")
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware")
const permitTo = require("../../middleware/permitTo")
const catchAsync = require("../../services/catchAsync")

const router=require("express").Router()

router.route("/users").get(isAuthenticated,permitTo("admin"),catchAsync(getUsers))

router.route("/users/:id").delete(isAuthenticated,permitTo("admin"),catchAsync(deleteUser))



module.exports=router