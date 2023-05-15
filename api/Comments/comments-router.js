const router = require("express").Router();
const commentModel = require("./comments-model");

router.get("/", async (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",

  async (req, res, next) => {
    try {
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",

  async (req, res, next) => {
    try {
      res.status(201).json({
        message: ``,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", async (req, res, next) => {
  try {
    res.status(200).json({
      message: ``,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json({
      message: ``,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
