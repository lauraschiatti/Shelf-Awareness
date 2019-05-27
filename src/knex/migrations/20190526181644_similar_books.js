
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('similar_books', function(table) {
          table.integer('book_1').unsigned().references('books.id');
          table.integer('book_2').unsigned().references('books.id');
          table.unique(['book_1', 'book_2']);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('similar_books')
  ]);
};
