require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/connectToMongoDB");
const productsRouter = require("./api/products/products.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectToMongoDB();

// cli run:   brew services start mongodb-community

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
