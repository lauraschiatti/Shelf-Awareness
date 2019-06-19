'use strict';

/**
 * Events available in the inventory
 * List of events available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/

// DB configuration
var knex = require('../knex/knex');

exports.eventsGET = function(offset, limit) {
  var today = new Date();

  return knex('books')
    .join('authors', 'authors.id', '=', 'books.author_id')
    .join('events', 'books.id', '=', 'events.book_id')
    .select()
    .where('events.held_on', '>=', today)
    .offset(offset)
    .limit(limit)
    .orderBy('held_on', 'asc')
    .then((event) => {
      return event.map(e => {
        return formatEvent(e);
      });
    })
    .catch((err) => console.log(err));
};

exports.eventsThisMonthGET = function(offset, limit) {
    var today = new Date();
    var endDate = getUpcomingEventsEndDate();
    
    return knex('books')
      .join('authors', 'authors.id', '=', 'books.author_id')
      .join('events', 'books.id', '=', 'events.book_id')
      .select()
      .where('events.held_on', '>=', today)
      .where('events.held_on', '<', endDate)
      .offset(offset)
      .limit(limit)
      .orderBy('held_on', 'asc')
      .then((event) => {
        return event.map(e => {
          return formatEvent(e);
        });
      })
      .catch((err) => console.log(err));
}


/**
 * Find event by ID
 * Returns a event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
exports.getEventById = function(eventId) {
  return knex('events')
    .where('events.id', eventId)
    .join('books', 'books.id', '=', 'events.book_id')
    .join('authors', 'authors.id', '=', 'books.author_id')
    .first()
    .then((e) => {
      return formatEvent(e);
    })
    .catch((err) => console.log(err));
};

exports.getBookEvents = function(bookId, offset, limit) {
    return knex('books')
      .join('authors', 'authors.id', '=', 'books.author_id')
      .join('events', 'books.id', '=', 'events.book_id')
      .select()
      .where('books.id', '=', bookId)
      .where('events.held_on', '>=', new Date())
      .offset(offset)
      .limit(limit)
      .orderBy('held_on', 'asc')
      .then((event) => {
        return event.map(e => {
          return formatEvent(e);
        });
      })
      .catch((err) => console.log(err));
}

function getUpcomingEventsEndDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day >= 28) {
        month++;
    }
    date.setDate(1);
    if (month == 12) {
        date.setFullYear(year + 1);
        date.setMonth(0);
    } else {
        date.setMonth(month);
    }
    return date;
}

function formatEvent(event) {
  event.book = {
    id: event.book_id,
    title: event.title,
    cover: event.cover,
    abstract: event.abstract,
    genre: event.genre,
    currency: event.currency,
    value: event.value,
    status: event.status,
    interview: event.interview
  };
  event.author = {
    id: event.author_id,
    name: event.name,
    picture: event.picture,
    bio: event.bio
  };

  delete event.book_id;
  delete event.title;
  delete event.cover;
  delete event.abstract;
  delete event.genre;
  delete event.currency;
  delete event.value;
  delete event.status;
  delete event.interview;
  delete event.created_at;
  delete event.updated_at;

  delete event.author_id;
  delete event.name;
  delete event.picture;
  delete event.bio;

  return event;
}
