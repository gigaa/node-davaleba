const validateProduct = (req, res, next) => {
  const { name, price, category, description } = req.body;

  if (name === undefined || price === undefined || category === undefined) {
    return res.status(400).json({
      message: "name, price and category are required fields.",
    });
  }

  if (typeof price !== "number" || price < 2 || price > 4000) {
    return res.status(400).json({
      message: "The price should be between 2-4000.",
    });
  }

  next();
};

module.exports = { validateProduct };
