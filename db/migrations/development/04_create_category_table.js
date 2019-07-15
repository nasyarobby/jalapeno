exports.up = function(knex, Promise) {
    return knex.schema.createTable('category', t => {
        t.increments('id')
        t.string('category')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('category')
};