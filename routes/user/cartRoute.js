const { addToCart, getMyCartItems, deleteItemFromCart } = require("../../controller/users/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware")
const catchAsync = require("../../services/catchAsync")

const cartRouter=require("express").Router()
cartRouter.route("/cart").get(isAuthenticated,catchAsync(getMyCartItems))
cartRouter.route("/cart/:productId").post(isAuthenticated,catchAsync(addToCart)).delete(isAuthenticated,catchAsync(deleteItemFromCart))


module.exports=cartRouter