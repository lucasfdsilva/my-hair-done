
exports.up = function(knex) {
  return knex.schema.table('hairdressers', table => {
    table.dropColumn('address')
    table.dropColumn('style_expertise')
    table.string('addressLine1')
    table.string('addressLine2')
    table.string('city')
    table.string('county')
    table.string('country')
  })
};

exports.down = function(knex) {
  
};
