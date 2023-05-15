const express = require("express");
const server = express();
require("dotenv").config();
const userRouter = require("./Users/users-router");
const postRouter = require("./Posts/posts-router");
const likeRouter = require("./Likes/likes-router");
const commentRouter = require("./Comments/comments-router");
const authRouter = require("./Auth/auth-router");
const authMw = require("./Auth/auth-middleware");

server.use(express.json());

server.use("/api/user", authMw.protected, userRouter);
server.use("/api/post", authMw.protected, postRouter);
server.use("/api/like", authMw.protected, likeRouter);
server.use("/api/comment", authMw.protected, commentRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ message: "Twitter backend project" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "server error",
  });
});

module.exports = server;
