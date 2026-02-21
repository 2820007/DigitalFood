const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require("../../controller/users/profile/profileController")
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware")
const catchAsync = require("../../services/catchAsync")

const  profileRouter=require("express").Router()

profileRouter.route("/profile").get(isAuthenticated,catchAsync(getMyProfile)).delete(isAuthenticated,catchAsync(deleteMyProfile)).patch(isAuthenticated,catchAsync(updateMyProfile))
profileRouter.route("/changePassword",isAuthenticated,catchAsync(updateMyPassword))


module.exports=profileRouter