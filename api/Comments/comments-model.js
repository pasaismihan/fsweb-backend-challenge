const db = require("../../data/db-config");

async function getAllComments() {
  return await db("comments");
}

async function getCommentById(id) {
  const comment = await db("comments as c").where("c.id", id).first();
  return comment;
}

async function getCommentsByPostId(post_id) {
  const comments = await db("comments as c")
    .leftJoin("posts as p", "c.post_id", "p.id")
    .where("p.id", post_id);
  return comments;
}

async function updateComment(comment, id) {
  await db("comments as c").where("c.id", id).first().update(comment);
  return await getCommentById(id);
}

async function createComment(comment) {
  const [id] = await db("comments").insert(comment);
  const newComment = await getCommentById(id);
  return newComment;
}

async function deleteComment(id) {
  return await db("comments as c").where("c.id", id).first().delete();
}

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  getAllComments,
};
