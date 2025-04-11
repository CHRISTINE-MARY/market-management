import React, { useState } from "react";
import { useMessage } from "../context/MessageContext";
import API from "../services/api";

export default function BuyStock({ id, stock, onBuy }) {
  const { message, updateMessage } = useMessage();
  const [quantity, setQuantity] = useState(0);

  const updateStock = async () => {
    if (quantity > stock || quantity<=0) {
      updateMessage("Invalid stock");
      return;
    }
    const newStock = stock - quantity;
    try {
      await API.post("/sale/add", { id, quantity });
      await API.put("/product/update", { id, Stock: newStock });
      updateMessage("stock bought succesfully");
      onBuy();
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <div className="buy-container">
      <div className="buy-popup">
        <div className="stock-info">
          <p className="stock-label">Available stock</p>
          <span className="stock-value">{stock}</span>
        </div>
        <input
          className="buy-input"
          type="text"
          name="quantity"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        
        <button className="buy-button" onClick={updateStock}>
          Buy
        </button>
      </div>
    </div>
  );
}
