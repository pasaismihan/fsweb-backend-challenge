/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (tbl) => {
    tbl.increments("id");
    tbl.text("message").notNullable();
    tbl.dateTime("created_at").notNullable().defaultTo(new Date());
    tbl.dateTime("updated_at");
    tbl
      .integer("post_id")
      .notNullable()
      .references("id")
      .inTable("posts")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
