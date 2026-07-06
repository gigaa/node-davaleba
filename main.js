const express = require("express");
const cors = require("cors");
const ordersRouter = require("./api/orders/orders.routes");
const globalLogger = require("./middlewares/logger.middleware");

const app = express();
const PORT = 3000;

app.use(globalLogger);
app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
