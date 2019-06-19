
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('books_in_cart', function(table) {
            table.integer('quantity').unsigned();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('books_in_cart', function(table) {
            table.dropColumn('quantity');
        })
    ]);
};
