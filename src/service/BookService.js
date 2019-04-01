'use strict';

let { database } = require ("./dataLayer");

let sqlDb;

exports.booksDbSetup = function(database) {
    sql = database;
    console.log("Checking if books table exists");
    // async
    return database.schema.hasTable("books").then(exists => {
        if(!exists) { // create the table
            console.log("It doesn't so we create it");
            database.schema.createTable("books", table => {
                table.increments();
                table.text("title");
                table.text("author");
                table.float("value");
                table.text("currency");
                table.enum("status", ["available", "out of stock"]);
            });
        }
    })
}

/**
*   Books available in the inventory  
**/
exports.booksGET = function (offset, limit) {
    return sqlDb("books").limit(limit).offset(offset).then( data => { 
        return data.map( e => { // return models that comply specifications in the api
            e.price = { value: e.value, currency: e.currency };
        })
    }) 
};

/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.booksGET = function(offset,limit) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ {
            "author" : "Dino Buzzati",
            "price" : {
                "currency" : "eur",
                "value" : 6.027456183070404E14
            },
            "id" : 0,
            "title" : "Il deserto dei tartari",
            "status" : "available"
        }, {
            "author" : "Dino Buzzati",
            "price" : {
                "currency" : "eur",
                "value" : 6.027456183070404E14
            },
            "id" : 0,
            "title" : "Il deserto dei tartari",
            "status" : "available"
        } ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "author" : "Dino Buzzati",
            "price" : {
                "currency" : "eur",
                "value" : 6.027456183070404E14
            },
            "id" : 0,
            "title" : "Il deserto dei tartari",
            "status" : "available"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}