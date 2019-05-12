
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('reviews',function (table){
            table.increments('id').primary().unsigned();
            table.string('comment').notNullable();
            table.timestamp('date').defaultTo(knex.fn.now());
            table.integer('user_id');
            table.foreign('user_id').references('users.id');
            table.integer('book_id');
            table.foreign('book_id').references('books.id');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('reviews')
    ]);
};
