const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("order", orderSchema);
