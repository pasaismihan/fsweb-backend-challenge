const router = require("express").Router();
const commentModel = require("./comments-model");

router.get("/", async (req, res, next) => {
  try {
    const allComments = await commentModel.getAllComments();
    res.json(allComments);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",

  async (req, res, next) => {
    try {
      const getById = await commentModel.getCommentById(req.params.id);
      res.status(200).json(getById);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:post_id",

  async (req, res, next) => {
    try {
      const user_id = await req.body.user_id;
      const postId = req.params.post_id;

      const model = {
        message: req.body.message,
        user_id: user_id,
        post_id: postId,
      };
      const insertedRecord = await commentModel.createComment(model);
      res.status(201).json(insertedRecord);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
