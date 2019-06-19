
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table){
            table.increments('id').primary().unsigned();
            table.string('name');
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('address');
            table.string('creditcard');
            table.unique('email');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};
