const { Router } = require("express");
const postRouter = require("./posts/posts.routes");
const ordersRouter = require("./orders/orders.routes");

const apiRouter = Router();

apiRouter.use("/posts", postRouter);
apiRouter.use("/orders", ordersRouter);

module.exports = apiRouter;
