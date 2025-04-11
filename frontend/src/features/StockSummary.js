import React, { useState, useEffect } from "react";
import { useMessage } from "../context/MessageContext";
import API from "../services/api";

export default function StockSummary() {
  const { message, updateMessage } = useMessage();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/product/get");
      setProducts(response.data.data);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="stock-overview">
        <h2>Stock Overview</h2>
        <div className="stock-row heading">
              <span className="product-name heading">Name</span>
              <span className="stock heading">Qnty</span>
            
        </div>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="stock-row" key={index}>
              <span className="product-name">{product.Name}</span>
              <span className="colon">:</span>
              <span className="stock">{product.Stock}</span>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}
