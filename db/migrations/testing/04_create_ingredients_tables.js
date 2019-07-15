exports.up = function(knex, Promise) {
    return knex.schema.createTable('ingredients', t => {
        t.increments('id')
        t.string('igredient_name')
        t.integer('quantity')
        t.string('unit')
        t.string('location')
        t.string('price')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ingredients')
};