import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      orderID: {
      type: Number,
      required: true,  
      unique: true    
      },

      address: {
        type: String,
        required: true,
      },

      phoneNo: {
        type: String,
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: [true, "Please select payment method"],
      enum: {
        values: ["COD", "Card"],
        message: "Please select: COD or Card",
      },
    },

    paymentInfo: {
      id: String,
      status: String,
    },

    itemsPrice: {
      type: Number,
      min: 0,
      required: true,
    },

    shippingAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      min: 0,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Please select correct order status",
      },
      default: "Processing",
    },

    deliveredAt: Date,
  },
  
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);