// Update with your config settings.
require("dotenv").config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres-db',
      user:     'postgres',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations",
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};