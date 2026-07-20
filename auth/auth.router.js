const { Router } = require("express");
const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "fullName,email and password requirs field" });
  }

  const exsistingUser = await userModel.findOne({ email: email });

  if (exsistingUser) {
    return res
      .status(400)
      .json({ message: "This user already exists. Try another email." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.create({ fullName, email, password: hashedPassword });

  res.json({ message: "created user" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password requirs field" });
  }

  const exsistingUser = await userModel.findOne({ email: email });

  if (!exsistingUser) {
    return res.status(401).json({ message: "not authed" });
  }

  const isEqualPassword = await bcrypt.compare(
    password,
    exsistingUser.password,
  );

  if (!isEqualPassword) {
    return res.status(400).json({ message: "The data is incorrect" });
  }

  const payload = {
    userId: exsistingUser._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "tokeni", data: token });
});

module.exports = authRouter;
