exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipecategory', t => {
        t.increments('id')
        t.integer('category_id')
        t.integer('recipe_id')
        t.foreign('category_id').references('id').inTable('category')
        t.foreign('recipe_id').references('id').inTable('recipes')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recipecategory')
};