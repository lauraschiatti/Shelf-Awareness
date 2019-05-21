
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('events', function(table) {
            table.increments('id').primary().unsigned();
            table.string('location');
            table.date('held_on');
            table.integer('book_id');
            table.foreign('book_id').references('books.id');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('events')
    ]);
};
