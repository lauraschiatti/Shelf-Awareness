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

exports.eventsGET = function (offset, limit) {
    return knex('events')
        .join('books', 'books.id', '=', 'events.book_id')
        .join('authors', 'authors.id', '=', 'books.author_id')
        .select()
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

function formatEvent(event){
    event.book = { title: event.title, cover: event.cover, abstract: event.abstract,
       genre: event.genre, currency: event.currency, value: event.value,
       status: event.status, interview: event.interview };
    event.author = { name: event.name, picture: event.picture, bio: event.bio };

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
