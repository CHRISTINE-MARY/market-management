import mongoose from "mongoose";
import { Product } from "./product.model.js";
const SalesSchema = new mongoose.Schema({
  PrdctId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  Date: { type: Date, required: true },
  Quantity: { type: Number, required: true },
});

export const Sale = mongoose.model("Sale", SalesSchema);

export const addSales = async (id, quantity) => {
  const date = new Date();
  try {
    const newSale = new Sale({
      PrdctId: id,
      Quantity: quantity,
      Date: date,
    });

    await newSale.save();
  } catch (err) {
    throw err;
  }
};

export const getSales = async (date) => {
  try {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    const sales = await Sale.find({
      Date: { $gte: start, $lt: end },
    });

    const saleDetails = [];
    let totalRevenue = 0;

    for (const sale of sales) {
      const product = await Product.findById(sale.PrdctId);
      if (product) {
        const revenue = product.Price * sale.Quantity;
        saleDetails.push({
          name: product.Name,
          price: product.Price,
          quantity: sale.Quantity,
          revenue,
        });
        totalRevenue += revenue;
      }
    }

    return {
      products: saleDetails,
      totalRevenue,
    };
  } catch (err) {
    throw err;
  }
};
