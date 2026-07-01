const validateProduct = (req, res, next) => {
  const { name, price, category, isExpire } = req.body;

  if (
    name === undefined ||
    price === undefined ||
    category === undefined ||
    isExpire === undefined
  ) {
    return res.status(400).json({
      message: "name, price, category, and isExpire are required fields.",
    });
  }

  if (typeof price !== "number" || price > 200) {
    return res.status(400).json({
      message: "Price must be a number and cannot be greater than 200.",
    });
  }

  next();
};

module.exports = { validateProduct };
