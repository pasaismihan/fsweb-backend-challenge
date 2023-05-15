const db = require("../../data/db-config");
const posts = require("../Posts/posts-model");

const getLiked = async function (filter) {
  const like = await db("likes as l").where(filter).first();

  return posts.getPostById(like.post_id);
};

const likePost = async function (like) {
  const [id] = await db("likes").insert(like);

  return await getLiked({ id: id });
};

module.exports = {
  getLiked,
  likePost,
};
