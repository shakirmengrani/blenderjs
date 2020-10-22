
exports.up = function(knex) {
    return knex.schema.createTable("users", function(table){
        table.increments();
        table.string("name", 255)
        table.string("mobile", 255)
        table.string("email", 255)
        table.string("password", 255)
        table.string("gender")
        table.boolean("is_active").defaultTo(true)
        table.boolean("is_verify").defaultTo(false)
        table.jsonb("latlng")
        table.timestamps(true, true)
        table.timestamp('deleted_at')
        table.unique('mobile')
        table.unique('email')
    }).createTable("user_roles", function(table){
        table.increments()
        table.string("name", 255)
        table.boolean("is_active").defaultTo(true)
        table.timestamps(true, true)
        table.timestamp('deleted_at')
    }).createTable("user_permissions", function(table){
        table.increments()
        table.string("can", 255)
        table.string("name", 255)
        table.boolean("is_active").defaultTo(true)
        table.timestamps(true, true)
        table.timestamp('deleted_at')
    }).createTable("user_user_roles", function(table){
        table.integer("user_id").references('users.id')
        table.integer("user_role_id").references('user_roles.id')
    }).createTable("user_user_permissions", function(table){
        table.integer("user_id").references('users.id')
        table.integer("user_permission_id").references('user_permissions.id')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("user_user_permissions")
  .dropTable("user_permissions")
  .dropTable("user_user_roles")
  .dropTable("user_roles")
  .dropTable("users")
};