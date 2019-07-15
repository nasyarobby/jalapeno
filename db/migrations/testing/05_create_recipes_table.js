exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipes', t => {
        t.increments('id')
        t.string('recipe_name')
        t.string('description')
        t.string('directions')
        t.string('preparationTime')
        t.string('cookTime')
        t.integer('portions')
        t.string('notes')
        t.foreign('ingredient_id').references('id').inTable('ingredients')
        t.foreign('user_id').references('id').inTable('users')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recipes')
};