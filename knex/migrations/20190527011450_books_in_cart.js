
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('books_in_cart', function(table) {
          table.increments('id').primary().unsigned();
          table.integer('book_id').unsigned().references('books.id');
          table.integer('cart_id').unsigned().references('carts.id');
          table.string('status');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('books_in_cart')
  ]);
};
