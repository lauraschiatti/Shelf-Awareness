'use strict';

var utils = require('../utils/writer.js');
var ReviewService = require('../service/ReviewService');
var User = require('../controllers/User');

module.exports.reviewsGET = function reviewsGET(req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  ReviewService.reviewsGET(offset, limit)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewById = function getReviewById(req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;

  ReviewService.getReviewById(reviewId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsByBook = function getReviewsByBook(req, res, next) {
  var bookId = req.swagger.params['bookId'].value;

  ReviewService.getReviewsByBook(bookId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.createReviewPOST = function createReviewPOST(req, res, next) {
  var bookId = req.swagger.params["bookId"].value;
  var userId = req.swagger.params["userId"].value;
  var comment = req.swagger.params["comment"].value;
  console.log(bookId);
  console.log(userId);
  console.log(comment);
  // var user = User.loggedInUserGET(req, res, next);
  // console.log("user " + user);
  // if (user) {
  ReviewService.createReview(userId, bookId, comment)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
  // }


};