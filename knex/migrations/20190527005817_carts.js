
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('carts', function(table) {
          // table.increments('id').primary().unsigned();
          table.integer('id').unsigned().references('users.id').primary();
          table.string('currency').notNullable();
          table.decimal('value').notNullable();
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('carts')
  ]);
};
