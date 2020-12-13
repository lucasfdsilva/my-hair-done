const awsParamStore = require( 'aws-param-store' );

/*
//Fetching credentials from AWS SSM
const dbHost = awsParamStore.getParameterSync('my-hair-done-db-host', { region: 'eu-west-1' } );
const user = awsParamStore.getParameterSync('my-hair-done-db-username', { region: 'eu-west-1' } );
const password = awsParamStore.getParameterSync('my-hair-done-db-password', { region: 'eu-west-1' } );
const database = awsParamStore.getParameterSync('my-hair-done-db-database', { region: 'eu-west-1' } );

module.exports = {
  
  development: {
    client: 'mysql',
    connection: {
      host: dbHost.Value,
      user: user.Value,
      password: password.Value,
      database: database.Value,
      timezone: 'UTC',
      dateStrings: true
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

};
*/
