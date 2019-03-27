exports.up = function (knex, Promise) {
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
        knex.schema.createTable("tag", (tag) => {
            tag.increments().unsigned();
            tag.string("description", 100).defaultTo("Medium priority");
            tag.enu("Priority", ["HIGH", "MEDIUM", "LOW"]).defaultTo("MEDIUM");
        }),
        knex.schema.createTable("todos", (todos) => {
            todos.increments().unsigned();
            todos.integer("tag_id")
                .references("id")
                .inTable("tag")
                .onDelete("CASCADE");
            todos.integer("user_id")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE").notNullable();
            !todos.string("title", 200);
            !todos.string("description", 200);
            todos.dateTime('date').defaultTo(knex.fn.now());
            todos.timestamp('created_at').defaultTo(knex.fn.now());
            todos.timestamp('update_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("todos"),
        knex.schema.dropTableIfExists("todo"),
        knex.schema.dropTableIfExists("tag"),
        knex.schema.dropTableIfExists("users")

    ]);
};
