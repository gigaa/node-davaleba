const { Router } = require("express");
const { validateProduct } = require("../../middlewares/validate.middleware");
const {
  authenticate,
  checkRole,
} = require("../../middlewares/auth.middleware");
const {
  productPagination,
  getByIdProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./products.service");

const productsRouter = Router();

productsRouter.get("/", productPagination);
productsRouter.get("/:id", getByIdProduct);
productsRouter.post(
  "/",
  authenticate,
  checkRole(["admin"]),
  validateProduct,
  createProduct,
);
productsRouter.put(
  "/:id",
  authenticate,
  checkRole(["admin", "editor"]),
  validateProduct,
  updateProduct,
);
productsRouter.delete(
  "/:id",
  authenticate,
  checkRole(["admin"]),
  deleteProduct,
);

module.exports = productsRouter;
