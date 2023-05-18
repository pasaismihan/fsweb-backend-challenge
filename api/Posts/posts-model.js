const db = require("../../data/db-config");

function getAllPosts() {
  return db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .select(
      "u.username",
      "p.id",
      "p.message",
      "p.created_at",
      "p.retweet_count"
    );
}

async function getPostById(id) {
  const post = await db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .select("p.id", "p.message", "p.created_at", "p.retweet_count")
    .where("p.id", id)
    .first();
  return post;
}

async function getPostsByFilter(filter) {
  const post = await db("posts").where(filter);
  return post;
}

async function createPost(post) {
  const [post_id] = await db("posts as p").insert(post);
  const newPost = await getPostsByFilter({ id: post_id });
  return newPost;
}

async function deletePost(id) {
  return await db("posts as p").where("p.id", id).first().delete();
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByFilter,
  createPost,
  deletePost,
};
