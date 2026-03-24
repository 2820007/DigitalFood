const {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../../controller/admin/order/orderController");
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware");
const permitTo = require("../../middleware/permitTo");
const catchAsync = require("../../services/catchAsync");

const adminOrderRoute = require("express").Router();

adminOrderRoute
  .route("/order")
  .get(isAuthenticated, permitTo("admin"), catchAsync(getAllOrders));
adminOrderRoute
  .route("/order/:id")
  .get(isAuthenticated, permitTo("admin"), catchAsync(getSingleOrder))
  .patch(isAuthenticated, permitTo("admin"), catchAsync(updateOrderStatus))
  .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteOrder));
module.exports=adminOrderRoute