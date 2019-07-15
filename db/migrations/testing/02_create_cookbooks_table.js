exports.up = function(knex, Promise) {
    return knex.schema.createTable('cookbooks', t => {
        t.increments('id')
        t.foreign('user_id').references('id').inTable('users')
        t.string('cookbook_name')
        t.string('category')
        t.timestamp('created_at')
        t.timestamp('updated_at').nullable()
        t.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cookbooks')
};