const db = require("../../data/db-config");

function getAllUsers() {
  return db("users as u").select("u.id", "u.role", "u.email", "u.username");
}

function getUserById(id) {
  return db("users as u")
    .select("u.id", "u.role", "u.email", "u.username")
    .where("u.id", id)
    .first();
}
function getUserByFilter(filter) {
  const filteredUser = db("users").where(filter);
  return filteredUser;
}
async function createUser(user) {
  const [id] = await db("users as u").insert(user);
  const newUser = await getUserByFilter({ "u.id": id });
  return newUser;
}
function updateUser(user, id) {
  return db("users as u").where("u.id", id).update(user);
}
function deletelUser(id) {
  return db("users as u").where("u.id", id).delete();
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByFilter,
  createUser,
  updateUser,
  deletelUser,
};
