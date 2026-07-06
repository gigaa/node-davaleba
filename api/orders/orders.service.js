const orders = [
  {
    id: 1,
    productName: "toster",
    totalPrice: 50,
    quantity: 1,
    status: false,
  },
  {
    id: 2,
    productName: "blender",
    totalPrice: 100,
    quantity: 2,
    status: true,
  },
  {
    id: 3,
    productName: "tomato",
    totalPrice: 10,
    quantity: 3,
    status: false,
  },
  {
    id: 4,
    productName: "potato",
    totalPrice: 20,
    quantity: 4,
    status: true,
  },
  {
    id: 5,
    productName: "carrot",
    totalPrice: 70,
    quantity: 5,
    status: false,
  },
  {
    id: 6,
    productName: "Vacuum cleaner",
    totalPrice: 150,
    quantity: 6,
    status: true,
  },
  {
    id: 7,
    productName: "TV",
    totalPrice: 200,
    quantity: 7,
    status: false,
  },
  {
    id: 8,
    totalPrice: 500,
    productName: "PS5",
    quantity: 8,
    status: false,
  },
  {
    id: 9,
    totalPrice: 300,
    productName: "apple",
    quantity: 0,
    status: false,
  },
];

function paginationOrders(req, res) {
  let { page = 1, take = 4 } = req.query;
  take > 4 ? (take = 4) : take;
  res.json(orders.slice((page - 1) * take, page * take));
}

function getByIdOrders(req, res) {
  const { id } = req.params;
  const findOrders = orders.find((el) => el.id === Number(id));
  if (!findOrders) {
    return res.status(400).json({ message: "Orders Not Found" });
  }
  res.json({ data: findOrders, message: "Success" });
}

function createOrders(req, res) {
  const { productName, totalPrice, quantity, status } = req.body;
  console.log({ productName, totalPrice, quantity, status });

  // middleware გადავიტანე ეს ლოგიკა

  //   if (quantity > 10 || totalPrice > 500) {
  //     return res.status(400).json({
  //       message:
  //         "quantity არ უნდა აღემატებოდეს 10-ს ან totalPrice არ უნდა აღემატებოდეს 500-ს ",
  //     });
  //   }
  const lastID = orders[orders.length - 1]?.id || 0;
  let newObj = {
    id: lastID + 1,
    productName,
    totalPrice,
    quantity,
    status,
  };
  orders.push(newObj);
  res.json({ data: orders, message: "Orders Was Added" });
}

function updateOrders(id, body) {
  //   const { id } = req.params;
  //   const userRole = req.headers.authorization;
  //   console.log({ userRole });

  const { productName, totalPrice, quantity, status } = body;
  const ordersIndex = orders.findIndex((el) => el.id === Number(id));
  if (ordersIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  orders[ordersIndex] = {
    ...orders[ordersIndex],
    totalPrice: totalPrice || orders[ordersIndex].totalPrice,
    productName: productName || orders[ordersIndex].productName,
    quantity: quantity || orders[ordersIndex].quantity,
    status: status || orders[ordersIndex].status,
  };
  return orders[ordersIndex];
  //   res.json({ data: orders[ordersIndex], message: "Orders Was Updated" });
}

function updateOrdersStatusOnly(id, status) {
  const order = orders.find((order) => order.id === Number(id));
  if (!order) return null;

  order.status = status;
  return order;
}

function deleteOrders(req, res) {
  const { id } = req.params;
  const ordersIndex = orders.findIndex((el) => el.id === Number(id));
  if (ordersIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  const deletedUser = orders.splice(ordersIndex, 1);
  res.json({ message: "Orders Was Deleted", data: deletedUser });
}

module.exports = {
  paginationOrders,
  getByIdOrders,
  createOrders,
  deleteOrders,
  updateOrders,
  updateOrdersStatusOnly,
};
