const express = require("express");
const {
  createReview,
  deleteReview,
  getMyReviews,
} = require("../../controller/users/review/reviewController");
const catchAsync = require("../../services/catchAsync");
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware");

const reviewRoute = express.Router();

reviewRoute.route("/reviews", isAuthenticated, catchAsync(getMyReviews));

reviewRoute
  .route("/reviews/:id")
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(createReview));

module.exports = reviewRoute;
