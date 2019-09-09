
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments().notNullable();
    tbl.string('username', 20)
        .notNullable()
        .unique()
    tbl.string('password', 80).notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
