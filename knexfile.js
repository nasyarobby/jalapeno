// Update with your config settings.
require("dotenv").config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations/development'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations/testing'
    },
    seeds: {
      directory: __dirname + '/db/seeds/testing'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }

};