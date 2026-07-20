require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const authRouter = require("./auth/auth.router");
const isAuth = require("./middleware/isAuth.middleWare");
const connectToMongoDB = require("./db/connectToMongo");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectToMongoDB();

app.use("/users", isAuth, userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
