exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('authors', function(table) {
      table.increments('id').primary().unsigned();
      table.string('name').notNullable();
      table.string('picture').defaultTo('null');
      table.string('bio', 1200);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('books', function(table) {
      table.increments('id').primary().unsigned();
      table.string('title').notNullable();
      table.integer('author_id').unsigned().references('authors.id');
      table.string('cover').defaultTo('null');
      table.string('abstract', 1200);
      table.enum('genre', ['Adventure', 'comic', 'Crime', 'Erotic', 'Fiction', 'Fantasy',
        'Historical', 'Horror', 'Magic', 'Realism', 'Mystery', 'Paranoid', 'Philosophical', 'Political',
        'Romance', 'Satire', 'Science', 'Thriller'
      ]);
      table.string('currency').notNullable();
      table.decimal('value').notNullable();
      table.enum('status', ['available', 'out of stock']).defaultTo('available');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books'),
    knex.schema.dropTable('authors')
  ]);
};