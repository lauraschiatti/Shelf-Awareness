
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('carts')
    ]);
};

exports.down = function(knex, Promise) {

};
