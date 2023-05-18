const db = require("../../data/db-config");
const postModel = require("./posts-model");

const payloadCheck = function (req, res, next) {
  try {
    const message = req.body.message;
    if (!message || message.trim() === "") {
      res.status(400).json({ message: "İçerik gereklidir" });
    } else if (message.length > 140) {
      res.status(400).json({ message: "140 karakterden büyük olamaz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  payloadCheck,
};
