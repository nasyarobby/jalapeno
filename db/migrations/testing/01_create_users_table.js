exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', t => {
        t.increments('id')
        t.string('username').unique()
        t.string('email').unique()
        t.string('password')
        t.string('name')
        t.string('verification_code').nullable()
        t.timestamp('verification_code_expired_at').nullable()
        t.timestamp('verified_at').nullable()
        t.integer('usertype').unsigned().defaultTo(0);
        t.timestamps(true, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};