
let { booksDbSetup } = require("./BookService");

var sqlDb = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'shelfAwareness'
  }
}
const knex = require('knex')(sqlDb);
const books = [
        { title: 'Audi',  value: 52642 },]
knex.schema.createTable('books', (table) => {
    table.increments('id')
    table.string('title')
    table.integer('value')
}).then(() => console.log("table created"))
knex('books').insert(books).then(() => console.log("data inserted"))
        .catch((err) => { console.log("TABLE NOT FILLED");console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        })
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    })



// knex.from('books').select("*")
//     .then((rows) => {
//         for (row of rows) {
//             console.log(`${row['id']} ${row['title']}`);
//         }
//     }).catch((err) => { console.log( err); throw err })
//     .finally(() => {
//         knex.destroy();
//     });
