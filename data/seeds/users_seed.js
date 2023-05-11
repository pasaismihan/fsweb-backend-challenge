/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("users").insert([
    {
      id: 1,
      username: "pasaismihan",
      password: "2323",
      email: "pasa@twitter.com",
      bio_text: "lorem ipsum dolor...",
      location: "ANTALYA",
    },
    {
      id: 2,
      username: "taneraytas",
      password: "4245",
      email: "taner@twitter.com",
      bio_text: "lorem ipsum dolor...",
      location: "IZMIR",
    },
    {
      id: 3,
      username: "hamdiboyraz",
      password: "5674",
      email: "hamdi@twitter.com",
      bio_text: "lorem ipsum dolor...",
      location: "ISTANBUL",
    },
    {
      id: 4,
      username: "aslidivarci",
      password: "1253",
      email: "asli@twitter.com",
      bio_text: "lorem ipsum dolor...",
      location: "FETHIYE",
    },
  ]);
  await knex("posts").insert([
    {
      id: 1,
      message: "lorem ipsum dolor...",
      retweet_count: 50,
      user_id: 2,
    },
    {
      id: 2,
      message: "lorem ipsum dolor...",
      retweet_count: 450,
      user_id: 1,
    },
    {
      id: 3,
      message: "lorem ipsum dolor...",
      retweet_count: 210,
      user_id: 4,
    },
    {
      id: 4,
      message: "lorem ipsum dolor...",
      retweet_count: 156,
      user_id: 3,
    },
  ]);
  await knex("likes").insert([
    {
      id: 1,
      user_id: 3,
      post_id: 3,
    },
    {
      id: 2,
      user_id: 4,
      post_id: 2,
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
    },
  ]);
  await knex("comments").insert([
    {
      id: 1,
      message: "lorem ipsum dolor...",
      post_id: 1,
    },
    {
      id: 2,
      message: "lorem ipsum dolor...",
      post_id: 3,
    },
    {
      id: 3,
      message: "lorem ipsum dolor...",
      post_id: 4,
    },
  ]);
};
