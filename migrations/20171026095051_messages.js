exports.up = function(knex, Promise) {
return knex.schema.createTable('messages', function(table){
  table.increments()
  table.varchar('name', 255).notNullable()
  table.varchar('message').notNullable()
  table.timestamps(true, true)
})
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('messages')
};
