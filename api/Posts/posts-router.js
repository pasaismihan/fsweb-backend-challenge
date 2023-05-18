const router = require("express").Router();
const postModel = require("./posts-model");
const postMw = require("./posts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allpost = await postModel.getAllPosts();
    res.json(allpost);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const postById = await postModel.getPostById(req.params.id);
    res.json(postById);
  } catch (error) {
    next(error);
  }
});

router.post("/add", postMw.payloadCheck, async (req, res, next) => {
  // let user_id =
  try {
    const user_id = await req.body.user_id;

    const model = {
      message: req.body.message,
      user_id: user_id,
    };
    const insertedRecord = await postModel.createPost(model);
    res.status(201).json(insertedRecord);
  } catch (error) {
    next(error);
  }
});
router.delete("/del/:id", async (req, res, next) => {
  let deleted = await Posts.getPostById(req.params.id);
  try {
    if (deleted) {
      await Posts.remove(req.params.id);
      res.json({ message: "Post silindi" });
    } else {
      next({ status: 404, message: "Böyle bir post yok" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
