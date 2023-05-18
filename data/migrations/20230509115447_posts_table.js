/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (tbl) => {
    tbl.increments("id");
    tbl.text("message").notNullable();
    tbl.dateTime("created_at").notNullable().defaultTo(new Date());
    tbl.dateTime("updated_at");
    tbl.integer("retweet_count").notNullable().defaultTo(0).unsigned();
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
