'use strict';

var utils = require('../utils/writer.js');
var ReviewService = require('../service/ReviewService');

module.exports.reviewsGET = function reviewsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  ReviewService.reviewsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewById = function getReviewById (req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;

  ReviewService.getReviewById(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
