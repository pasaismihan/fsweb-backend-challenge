const router = require("express").Router();
const userModel = require("../Users/users.model");
const bcrypt = require("bcryptjs");
const mw = require("./auth-middleware");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const createdUser = await userModel.createUser({
      username: username,
      password: hashedPassword,
      email: email,
      role: role,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  mw.payloadCheck,
  mw.RegisteredUserCheck,
  mw.PasswordCheck,
  mw.generateToken,
  async (req, res, next) => {
    try {
      return res.json({
        message: `welcome back ${req.user.username}`,
        token: req.user.token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
