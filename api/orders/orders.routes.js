const { Router } = require("express");
const { validateOrders } = require("../../middlewares/validate.middleware");
const {
  authenticate,
  checkRole,
} = require("../../middlewares/auth.middleware");
const {
  paginationOrders,
  getByIdOrders,
  createOrders,
  deleteOrders,
  updateOrders,
  updateOrdersStatusOnly,
} = require("./orders.service");

const ordersRouter = Router();

ordersRouter.get("/", paginationOrders);
ordersRouter.get("/:id", getByIdOrders);
ordersRouter.post(
  "/",
  authenticate,
  checkRole(["admin"]),
  validateOrders,
  createOrders,
);
ordersRouter.put(
  "/:id",
  authenticate,
  checkRole(["admin", "editor"]),
  validateOrders,
  //   updateOrders,
  (req, res) => {
    const userRole = req.headers.authorization;
    // console.log(userRole);
    const orderId = req.params.id;

    if (userRole == "admin") {
      //   console.log("userRole == admin");
      const updatedOrder = updateOrders(orderId, req.body);
      if (!updatedOrder)
        return res.status(404).json({ message: "შეკვეთა ვერ მოიძებნა" });
      return res.json(updatedOrder);
    }

    if (userRole === "editor") {
      if (!req.body.status) {
        return res
          .status(400)
          .json({ message: "ედიტორს მხოლოდ სტატუსის (status) შეცვლა შეუძლია" });
      }
      const updatedOrder = updateOrdersStatusOnly(orderId, req.body.status);
      if (!updatedOrder)
        return res.status(404).json({ message: "შეკვეთა ვერ მოიძებნა" });
      return res.json(updatedOrder);
    }
  },
);
ordersRouter.delete("/:id", authenticate, checkRole(["admin"]), deleteOrders);

module.exports = ordersRouter;
