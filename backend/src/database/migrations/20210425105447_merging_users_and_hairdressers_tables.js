
exports.up = function(knex) {
  return knex.schema.table('hairdressers', table => {
    table.dropColumn('number_of_customers')
    table.boolean('is_hairdresser')
    table.renameColumn('past_haircuts', 'past_bookings')
  })
};

exports.down = function(knex) {
  return knex.schema.table('hairdressers', table => {
    table.integer('number_of_customers')
    table.dropColumn('is_hairdresser')
    table.renameColumn('past_bookings', 'past_haircuts')
  })
};
