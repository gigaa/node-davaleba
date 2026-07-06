const globalLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(` ${req.method} [${timestamp}] ${req.url}`);
  next();
};

module.exports = globalLogger;
