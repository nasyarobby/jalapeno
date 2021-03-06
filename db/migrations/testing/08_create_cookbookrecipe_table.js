exports.up = function (knex, Promise) {
    return knex.schema.createTable('cookbookrecipe', t => {
        t.increments('id')
        t.integer('cookbook_id').unsigned()
        t.integer('recipe_id').unsigned()
        t.foreign('cookbook_id').references('id').inTable('cookbooks').onDelete('CASCADE')
        t.foreign('recipe_id').references('id').inTable('recipes').onDelete('CASCADE')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cookbookrecipe')
};