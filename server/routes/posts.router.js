const { Router } = require("express");
const postsModel = require("../models/posts.model");

const postsRouter = Router();

postsRouter.get("/", async (req, res) => {
  const findAllPosts = await postsModel.find();
  res.json({
    message: "all post finded",
    data: findAllPosts,
  });
});

module.exports = postsRouter;
