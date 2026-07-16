const { Router } = require("express");
const { validatePost } = require("../../middlewares/validate.middleware");
const {
  authenticate,
  checkRole,
} = require("../../middlewares/auth.middleware");
const {
  PostPagination,
  getByIdPost,
  createPost,
  deletePost,
  updatePost,
} = require("./posts.service");

const postRouter = Router();

postRouter.get("/", PostPagination);
postRouter.get("/:id", getByIdPost);
postRouter.post(
  "/",
  authenticate,
  checkRole(["admin"]),
  validatePost,
  createPost,
);
postRouter.put(
  "/:id",
  authenticate,
  checkRole(["admin", "editor"]),
  validatePost,
  updatePost,
);
postRouter.delete("/:id", authenticate, checkRole(["admin"]), deletePost);

module.exports = postRouter;
