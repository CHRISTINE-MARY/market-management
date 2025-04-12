import { addSales, getSales } from "../models/sale.model.js";

//new sale
export const newSale = async (req, res) => {
  const { id, quantity } = req.body;

  try {
    await addSales(id, quantity);
    res.status(201).json({ success: true, message: "added sale succesfully" });
  } catch (err) {
    res.status(401).json({ success: false, message: "couldnt add sale" });
  }
};

//list all sales
export const allSales = async (req, res) => {
  const { date } = req.body;
  try {
    const response = await getSales(date);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Couldnt fetch all sales" });
  }
};

//list sales for given date
export const todaySales = async (req, res) => {
  const { date } = req.body;

  try {
    const response = await getSales(date);
    res.status(201).json({
      success: true,
      data: response.products,
      revenue: response.totalRevenue,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
