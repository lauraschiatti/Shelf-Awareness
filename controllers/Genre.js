'use strict';

var utils = require('../utils/writer.js');
var GenreService = require('../service/GenreService');

module.exports.genresGET = function genresGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  GenreService.genresGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
