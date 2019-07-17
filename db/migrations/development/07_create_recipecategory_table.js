exports.up = function (knex, Promise) {
    return knex.schema.createTable('recipecategory', t => {
        t.increments('id')
        t.integer('category_id').unsigned()
        t.integer('recipe_id').unsigned()
        t.foreign('category_id').references('id').inTable('category')
        t.foreign('recipe_id').references('id').inTable('recipes')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('recipecategory')
};