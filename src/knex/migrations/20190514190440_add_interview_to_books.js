
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('books', function(table) {
            table.string('interview', 2400);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('books', function(table) {
            table.dropColumn('interview');
        })
    ]);
};
