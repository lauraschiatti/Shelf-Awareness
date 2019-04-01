const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BookService");

var sqlDb = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'shelfAwareness'
  },
  searchPath: ['knex', 'public'],
});

function setupDataLayer() {
  console.log("Setting up data layer");
  return booksDbSetup(sqlDb);
}


module.exports = { database: sqlDb, setupDataLayer };



// Check setup
//> DATABASE_URL=postgres://postgres:root@localhost/shelfAwareness