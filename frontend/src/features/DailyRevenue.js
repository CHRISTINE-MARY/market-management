import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useMessage } from "../context/MessageContext";

export default function DailyRevenue({ date }) {
  const [stocks, setStock] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const { message, updateMessage } = useMessage();

  const getDetails = async () => {
    console.log(new Date(date));
    try {
      const response = await API.post("/sale/revenue", { date });
      setStock(response.data.data);
      setRevenue(response.data.revenue);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, [date]);

  return (
    <>
      <h2>Todays Sale</h2>
      <div className="stock-row">
        <span className="product-name heading">Name</span>
        <span className="price heading">Price(Qnty)</span>
      </div>
      {stocks.length > 0 ? (
        stocks.map((stock, index) => (
          <div className="stock-row" key={index}>
            <span className="product-name">{stock.name}</span>
            <span className="colon">:</span>
            <span className="price">{stock.price}</span>
            <span className="quantity">({stock.quantity})</span>
          </div>
        ))
      ) : (
        <p>No sale today</p>
      )}
      <div className="total-revenue">
        <span>Total Revenue:</span> <span>₹{revenue}</span>
      </div>
    </>
  );
}
