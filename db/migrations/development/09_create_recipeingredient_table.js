exports.up = function (knex, Promise) {
    return knex.schema.createTable('recipeingredient', t => {
        t.increments('id')
        t.integer('recipe_id').unsigned()
        t.integer('ingredient_id').unsigned()
        t.foreign('recipe_id').references('id').inTable('recipes').onDelete("CASCADE")
        t.foreign('ingredient_id').references('id').inTable('ingredients')
        t.float('quantity', 8, 2)
        t.string('quantity_text').nullable()
        t.string('unit')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('recipeingredient')
};