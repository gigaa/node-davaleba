const { isValidObjectId } = require("mongoose");
const productModel = require("../../models/product.model");

async function productPagination(req, res) {
  let { page = 1, take = 5 } = req.query;

  take > 5 ? (take = 5) : take;
  const findAllInfo = await productModel
    .find({})
    .skip((page - 1) * take)
    .limit(take);
  res.json({ message: "finded all info successfully", data: findAllInfo });
}

async function getByIdProduct(req, res) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findUserByID = await productModel.findById(id);

  res.json({ message: "finded successfully", data: findUserByID });
}

async function createProduct(req, res) {
  const { name, price, category, description } = req.body;
  console.log({ name, price, category, description });
  if (
    !name ||
    typeof name !== "string" ||
    !price ||
    typeof name !== "number" ||
    !category ||
    typeof category !== "string"
  ) {
    return res.json({
      message:
        "name,name must be a string,price and category is required field",
    });
  }

  const createProduct = await productModel.create({
    name,
    price,
    category,
    description,
  });
  res.json({ message: "created succesffuly", data: createProduct });
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, category, description } = req.body;

  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findProductByIdAndUpdate = await productModel.findByIdAndUpdate(
    id,
    { name, price, category, description },
    { new: true },
  );
  res.json({ message: "udpated successfully", data: findProductByIdAndUpdate });
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.json({ message: "invalid mongo Id" });
  }
  const deletedProduct = await productModel.findByIdAndDelete(id);
  res.json({ message: "deleted successfully", data: deletedProduct });
}

module.exports = {
  productPagination,
  getByIdProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
