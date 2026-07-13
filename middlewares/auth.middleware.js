const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token is missing." });
  }
  req.user = { role: token };
  next();
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user);

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { authenticate, checkRole };
