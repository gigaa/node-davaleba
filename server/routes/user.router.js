const { Router } = require("express");
const usersModel = require("../models/users.model");
const { isValidObjectId } = require("mongoose");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const findAllUser = await usersModel.find().select("-password");
  res.json({
    message: "success finded",
    data: findAllUser,
  });
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "incorect ID",
      data: null,
    });
  }

  const findUserById = await usersModel.findById(id).select("-password");

  if (!findUserById) {
    return res.status(404).json({ message: "not found user" });
  }

  res.json({
    message: "success finded",
    data: findUserById,
  });
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "incorect ID",
      data: null,
    });
  }
  const deletedUser = await usersModel.findByIdAndDelete(id);

  res.json({
    message: "deleted user",
    data: deletedUser,
  });
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "incorect ID",
      data: null,
    });
  }

  const updateUser = await usersModel
    .findByIdAndUpdate(id, { fullName, email, password }, { new: true })
    .select("-password");

  res.json({
    message: "user updated",
    data: updateUser,
  });
});

module.exports = userRouter;
