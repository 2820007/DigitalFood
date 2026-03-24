const { getAllOrders } = require("../../controller/admin/order/orderController")
const { createOrder, updateMyOrder, deleteMyOrder, cancelOrder } = require("../../controller/users/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware")
const catchAsync = require("../../services/catchAsync")

const orderRouter=require("express").Router()


orderRouter.route("/orders").get(isAuthenticated,catchAsync(getAllOrders)).post(isAuthenticated,catchAsync(createOrder))
orderRouter.route("/cancel").patch(isAuthenticated,catchAsync(cancelOrder))
orderRouter.route("/orders/:id").patch(isAuthenticated,catchAsync(updateMyOrder)).delete(isAuthenticated,catchAsync(deleteMyOrder))

module.exports=orderRouter