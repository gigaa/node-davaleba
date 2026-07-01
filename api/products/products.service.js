// price, category ,isExpire  და name
const products = [
  {
    id: 1,
    price: 50,
    name: "toster",
    category: "Electronics",
    isExpire: false,
  },
  {
    id: 2,
    price: 100,
    name: "blender",
    category: "Electronics",
    isExpire: true,
  },
  {
    id: 3,
    price: 5,
    name: "tomato",
    category: "Food",
    isExpire: false,
  },
  {
    id: 4,
    price: 2,
    name: "potato",
    category: "Food",
    isExpire: true,
  },
  {
    id: 5,
    price: 2,
    name: "carrot",
    category: "Food",
    isExpire: false,
  },
  {
    id: 6,
    price: 150,
    name: "Vacuum cleaner",
    category: "Electronics",
    isExpire: true,
  },
  {
    id: 7,
    price: 200,
    name: "TV",
    category: "Electronics",
    isExpire: false,
  },
  {
    id: 8,
    price: 500,
    name: "PS5",
    category: "Electronics",
    isExpire: false,
  },
  {
    id: 9,
    price: 3,
    name: "apple",
    category: "Food",
    isExpire: false,
  },
];

function productPagination(req, res) {
  let { page = 1, take = 4 } = req.query;
  take > 4 ? (take = 4) : take;
  res.json(products.slice((page - 1) * take, page * take));
}

function getByIdProduct(req, res) {
  const { id } = req.params;
  const findProducts = products.find((el) => el.id === Number(id));
  if (!findProducts) {
    return res.status(400).json({ message: "products Not Found" });
  }
  res.json({ data: findProducts, message: "Success" });
}

function createProduct(req, res) {
  const { name, price, category, isExpire } = req.body;
  console.log({ name, price, category, isExpire });
  const lastID = products[products.length - 1]?.id || 0;
  let newObj = {
    id: lastID + 1,
    name,
    price,
    category,
    isExpire,
  };
  products.push(newObj);
  res.json({ data: products, message: "User Was Added" });
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, category, isExpire } = req.body;
  const userIndex = products.findIndex((el) => el.id === Number(id));
  if (userIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  products[userIndex] = {
    ...products[userIndex],
    price: price || products[userIndex].price,
    name: name || products[userIndex].name,
    category: category || products[userIndex].category,
    isExpire: isExpire || products[userIndex].isExpire,
  };

  res.json({ data: products[userIndex], message: "User Was Updated" });
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const userIndex = products.findIndex((el) => el.id === Number(id));
  if (userIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  const deletedUser = products.splice(userIndex, 1);
  res.json({ message: "User Was Deleted", data: deletedUser });
}

module.exports = {
  productPagination,
  getByIdProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
