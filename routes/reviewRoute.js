const express = require("express");
const {
  getProductReview,
  createReview,
  deleteReview,
  addProductReview
} = require("../controller/users/userController");
const catchAsync = require("../services/catchAsync");
const isAuthenticated = require("../middleware/isAuthenticateMidddleware");


const reviewRoute = express.Router();


reviewRoute
  .route("/reviews/:id")
  .get(catchAsync(getProductReview))
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(addProductReview));

module.exports = reviewRoute;
