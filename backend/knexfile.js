/*
const AWSSecretsManager = require("./AWSSecretsManager");

module.exports = {
  async getConfiguration() {
    const credentials = await AWSSecretsManager.getCredentials('my-hair-done'); 

    return {
      development: {
        client: "mysql",
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
*/