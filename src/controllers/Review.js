'use strict';

var utils = require('../utils/writer.js');
var ReviewService = require('../service/ReviewService');
var UserService = require('../service/UserService');

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

module.exports.createReviewPOST = function userRegisterPOST(req, res, next) {
  var bookId = req.swagger.params["bookId"].value;
  var comment = req.swagger.params["comment"].value;
  var user;
  if (req.session.id) {
    UserService.getUserById(req.session.id)
      .then(function(response) {
        console.log("response " + response);
        console.log("response[0] " + response[0]);
        console.log("response json " + response.json());
        user = response.json();
      })
      .catch(function(response) {
        utils.writeJson(res, response);
      });
    if (user) {
      ReviewService.createReview(user.email,bookId,comment)
        .then(function(response) {
          utils.writeJson(res, response);
        })
        .catch(function(response) {
          utils.writeJson(res, response);
        });
    }
  }

};
