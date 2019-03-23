
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (users) {
            users.increments().unsigned();
            users.string("first_name", 128).notNullable();
            users.string("last_name", 128).notNullable();
            users.string("email", 128).notNullable().unique();
            users.string("provider", 128).notNullable().defaultTo("local");
            users.string("password", 128).notNullable().defaultTo("");
            users.enu("role", ["Client", "Admin"]).notNullable().defaultTo("Client");
        }),
        knex.schema.createTable("todos", (todos)=>{
            todos.increments().unsigned();
            !todos.string("title", 200);
            !todos.string("description", 200);
            todos.date('date').defaultTo(knex.fn.now());
            todos.timestamp('created_at').defaultTo(knex.fn.now());
            todos.timestamp('update_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("users")
    ]);
};
