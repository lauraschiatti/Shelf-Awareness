'use strict';

var utils = require('../utils/writer.js');
var ThemeService = require('../service/ThemeService');

module.exports.themesGET = function themesGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  ThemeService.themesGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
