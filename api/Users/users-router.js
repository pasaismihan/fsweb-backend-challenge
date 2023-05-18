const router = require("express").Router();
const userModel = require("./users.model");
const mw = require("../Auth/auth-middleware");

router.get("/", mw.checkRole("admin"), async (req, res, next) => {
  try {
    const allUsers = await userModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next();
  }
});

module.exports = router;
