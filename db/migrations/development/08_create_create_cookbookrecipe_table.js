exports.up = function (knex, Promise) {
    return knex.schema.createTable('cookbookrecipe', t => {
        t.increments('id')
        t.integer('cookbook_id').unsigned()
        t.integer('recipe_id').unsigned()
        t.foreign('cookbook_id').references('id').inTable('cookbooks')
        t.foreign('recipe_id').references('id').inTable('recipes')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cookbookrecipe')
};