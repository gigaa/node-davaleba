const { isValidObjectId } = require("mongoose");
const orderSchema = require("../../models/order.model");

async function paginationOrders(req, res) {
  let { page = 1, take = 3 } = req.query;

  take > 3 ? (take = 3) : take;
  const findAllInfo = await orderSchema
    .find({})
    .skip((page - 1) * take)
    .limit(take);
  res.json({ message: "finded all info successfully", data: findAllInfo });
}

async function getByIdOrders(req, res) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findUserByID = await orderSchema.findById(id);

  res.json({ message: "finded successfully", data: findUserByID });
}

async function createOrders(req, res) {
  const { productName, totalPrice, quantity, status } = req.body;
  console.log({ productName, totalPrice, quantity, status });
  if (
    !productName ||
    typeof productName !== "string" ||
    !totalPrice ||
    typeof totalPrice !== "number" ||
    !quantity ||
    typeof quantity !== "number"
  ) {
    return res.json({
      message: "productName,totalPrice,quantity and status is required field",
    });
  }

  const createOrder = await orderSchema.create({
    productName,
    totalPrice,
    quantity,
    status,
  });

  res.json({ message: "created succesffuly", data: createOrder });
}

async function updateOrders(id, body) {
  const { productName, totalPrice, quantity, status } = body;
  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findOrdersByIdAndUpdate = await orderSchema.findByIdAndUpdate(
    id,
    { productName, totalPrice, quantity, status },
    { new: true },
  );
  //   res.json({ message: "udpated successfully", data: findOrdersByIdAndUpdate });
  return findOrdersByIdAndUpdate;
}

async function updateOrdersStatusOnly(id, status) {
  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findOrdersByIdAndUpdateOnly = await orderSchema.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  //   res.json({ message: "udpated successfully", data: findOrdersByIdAndUpdateOnly });
  return findOrdersByIdAndUpdateOnly;
}

async function deleteOrders(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.json({ message: "invalid mongo Id" });
  }
  const deletedOrders = await orderSchema.findByIdAndDelete(id);
  res.json({ message: "deleted successfully", data: deletedOrders });
}

module.exports = {
  paginationOrders,
  getByIdOrders,
  createOrders,
  deleteOrders,
  updateOrders,
  updateOrdersStatusOnly,
};
