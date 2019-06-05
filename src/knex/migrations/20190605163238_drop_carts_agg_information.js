
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('books_in_cart', function(table) {
        table.dropForeign('cart_id');
        table.dropColumn('cart_id');
        table.integer('user_id').unsigned().references('users.id');
    })/*,

      knex.schema.dropTable('carts')*/
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('books_in_cart', function(table) {
            table.dropColumn('user_id');
        })
    ]);
};
