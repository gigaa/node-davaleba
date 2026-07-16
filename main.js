require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/connectToMongoDB");
const apiRouter = require("./api/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectToMongoDB();

app.use("/api", apiRouter);

// app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
