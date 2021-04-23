const AWSSecretsManager = require("./AWSSecretsManager");
require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DBNAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      timezone: 'UTC',
      dateStrings: true
    },
    pool: { 
      min: 0, 
      max: 10 
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

  async getConfiguration() {
    const credentials = await AWSSecretsManager.getCredentials('myhairdone-db'); 

    return {
      development: {
        client: 'mysql',
        connection: {
          host: credentials.host,
          database: credentials.dbname,
          user: credentials.username,
          password: credentials.password,
          timezone: 'UTC',
          dateStrings: true
        },
        pool: { 
          min: 0, 
          max: 10 
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
          directory: `${__dirname}/src/database/seeds`
        }
      }
    }
  }
}