exports.up = function (knex, Promise) {
    return knex.schema.createTable('ingredients', t => {
        t.increments('id')
        t.string('ingredient_name')
        t.string('location').nullable()
        t.float('price', 8, 2).nullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ingredients')
};