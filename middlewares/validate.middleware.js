const validateOrders = (req, res, next) => {
  const { productName, totalPrice, quantity, status } = req.body;

  if (
    productName === undefined ||
    totalPrice === undefined ||
    quantity === undefined ||
    status === undefined
  ) {
    return res.status(400).json({
      message:
        "productName, totalPrice, quantity and status are required fields.",
    });
  }

  if (typeof totalPrice !== "number" || totalPrice > 500) {
    return res.status(400).json({
      message: "totalPrice არ უნდა აღემატებოდეს 500-ს",
    });
  }

  if (typeof quantity !== "number" || quantity > 10) {
    return res.status(400).json({
      message: "quantity არ უნდა აღემატებოდეს 10-ს",
    });
  }
  next();
};

module.exports = { validateOrders };
