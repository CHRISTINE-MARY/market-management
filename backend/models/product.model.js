import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Category: { type: String, required: true },
  Stock: { type: Number, required: true },
  Desc: { type: String },
});

export const Product = mongoose.model("Product", ProductSchema);

export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const addProduct = async (name, category, price, stock, desc) => {
  try {
    const newprod = new Product({
      Name: name,
      Price: price,
      Category: category,
      Stock: stock,
      Desc: desc,
    });
    await newprod.save();
  } catch (err) {
    throw err;
  }
};

export const getProduct = async (id) => {
  try {
    const result = await Product.findById(id);
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (id, updates) => {
  try {
    await Product.findByIdAndUpdate(id, updates);
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    await Product.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
