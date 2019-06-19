'use strict';

var utils = require('../utils/writer.js');
var EventService = require('../service/EventService');

module.exports.eventsGET = function eventsGET(req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  EventService.eventsGET(offset, limit)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsThisMonthGET = function eventsThisMonthGET(req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  EventService.eventsThisMonthGET(offset, limit)
    .then(function(response) {
      // console.log(response);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventById = function getEventById(req, res, next) {
  var eventId = req.swagger.params['eventId'].value;

  EventService.getEventById(eventId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookEvents = function getBookEvents(req, res, next) {
    var bookId = req.swagger.params['bookId'].value;
    var offset = req.swagger.params['offset'].value;
    var limit = req.swagger.params['limit'].value;

    EventService.getBookEvents(bookId, offset, limit)
      .then(function(response) {
        utils.writeJson(res, response);
      })
      .catch(function(response) {
        utils.writeJson(res, response);
      });
};
