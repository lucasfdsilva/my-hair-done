
exports.up = function(knex) {
  return knex.schema.table('hairdressers', table => {
    table.boolean('is_admin')
  })
};

exports.down = function(knex) {
  return knex.schema.table('hairdressers', table => {
    table.dropColumn('is_admin')
  })
};
