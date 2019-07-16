exports.up = function (knex, Promise) {
    return knex.schema.createTable('recipeingredient', t => {
        t.increments('id')
        t.integer('recipe_id').unsigned()
        t.integer('ingredient_id').unsigned()
        t.foreign('recipe_id').references('id').inTable('recipes')
        t.foreign('ingredient_id').references('id').inTable('ingredients')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('recipeingredient')
};