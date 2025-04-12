import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../models/product.model.js";

//to get all products
export const allProducts = async (req, res) => {
  try {
    const results = await getProducts();
    return res.status(201).json({ success: true, data: results });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

//to search product by id
export const oneProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await getProduct(id);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    res.status(401).json({ success: false, message: "product not found" });
  }
};

//adds new product
export const newProduct = async (req, res) => {
  const { Name, Category, Price, Stock, Desc } = req.body;
  try {
    const response = await addProduct(Name, Category, Price, Stock, Desc);

    return res
      .status(201)
      .json({ success: true, message: "Added product suucessfully" });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Failed to add product" });
  }
};

//updates product details
export const UpdateProduct = async (req, res) => {
  const { id, ...updates } = req.body;

  try {
    await updateProduct(id, updates);
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Failed to update product" });
  }
};

//delete product
export const DeleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await deleteProduct(id);
    res.status(201).json({ success: true, message: "deleted product" });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Failed to update product" });
  }
};
