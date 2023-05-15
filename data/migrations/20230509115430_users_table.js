/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl.text("role").notNullable();
    tbl.text("email").unique().notNullable();
    tbl.text("password", 16).notNullable();
    tbl.text("username", 32).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
