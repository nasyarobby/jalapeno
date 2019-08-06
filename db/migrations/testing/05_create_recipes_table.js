exports.up = function (knex, Promise) {
    return knex.schema.createTable('recipes', t => {
        t.increments('id')
        t.string('recipe_name')
        t.text('description')
        t.text('directions')
        t.string('preparationTime')
        t.string('cookTime')
        t.integer('portions').unsigned()
        t.text('notes').nullable()
        t.timestamps(true, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('recipes')
};