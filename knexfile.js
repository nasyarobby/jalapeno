// Update with your config settings.
require("dotenv").config()

let development = {
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
}

let sqlite = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./database.db"
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/db/migrations/development'
  },
  seeds: {
    directory: __dirname + '/db/seeds/development'
  }
}

let testDefault = {
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
}

let production = {
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

let config = {
  development: development,
  sqlite: sqlite,
  test: testDefault,
  production: production
}

config.test = process.env.TEST_ENV ? config[process.env.TEST_ENV] : testDefault
if (process.env.NODE_ENV == "test" && process.env.TEST_ENV)
  console.log("Using testing environment with override configuration: ", process.env.TEST_ENV)

module.exports = config;