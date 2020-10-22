
exports.up = function(knex) {
  return knex.schema.createTable("orders", table => {
      table.increments();
      table.integer("user_id").references("user_id")
      table.string("order_number")
      table.integer("status")
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  
};
