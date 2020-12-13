const knex = require("knex");
const knexConfiguration = require("../../knexfile");

module.exports = {
  async connect() {
    const environments = await knexConfiguration.getConfiguration();
    const connection = knex(environments.development);

    return connection;
  },
};