exports.up = function(knex, Promise) {
    return knex.schema.createTable('days', t => {
        t.increments('id')
        t.integer('user_id')
        t.foreign('user_id').references('id').inTable('users')
        t.integer('calendar_day')
        t.integer('recipe_id')
        t.foreign('recipe_id').references('id').inTable('recipes')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('days')
};