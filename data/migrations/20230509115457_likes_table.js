/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", (tbl) => {
    tbl.increments("id");
    tbl.dateTime("created_at").notNullable().defaultTo(new Date());
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("post_id")
      .notNullable()
      .unsigned()
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
  return knex.schema.dropTableIfExists("likes");
};
