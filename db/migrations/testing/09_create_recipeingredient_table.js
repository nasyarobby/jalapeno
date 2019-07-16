exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipeingredient', t => {
        t.increments('id')
        t.integer('recipe_id')
        t.integer('ingredient_id')
        t.foreign('recipe_id').references('id').inTable('recipes')
        t.foreign('ingredient_id').references('id').inTable('ingredients')
        t.integer('quantity')
        t.string('unit')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recipeingredient')
};