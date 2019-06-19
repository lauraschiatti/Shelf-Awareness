
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('themes', function(table) {
        table.increments('id').primary().unsigned();
        table.string('theme').notNullable().unique();
      }),

      knex.schema.createTable('themes_in_book', function(table) {
        table.increments('id').primary().unsigned();
        table.integer('book_id');
        table.foreign('book_id').references('books.id');
        table.integer('theme_id');
        table.foreign('theme_id').references('themes.id');
      })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('book_themes'),
      knex.schema.dropTable('themes')
    ]);
};
