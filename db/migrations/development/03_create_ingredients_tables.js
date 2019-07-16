exports.up = function(knex, Promise) {
    return knex.schema.createTable('ingredients', t => {
        t.increments('id')
        t.string('ingredient_name')
        t.string('location')
        t.string('price')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ingredients')
};