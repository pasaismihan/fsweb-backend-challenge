/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl.text("email").unique().notNullable();
    tbl.text("password", 16).notNullable();
    tbl.text("username", 32).unique().notNullable();
    tbl.text("bio_text", 200);
    tbl.text("location");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
