import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useMessage } from "../context/MessageContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/stockForm.css";

const initialValues = {
  Name: "",
  Stock: "",
  Category: "",
  Price: "",
  Desc: "",
};

export default function StockForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, mode } = location.state || {};
  const { message, updateMessage } = useMessage();
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDetails = async () => {
    try {
      const response = await API.post("product/find", { id });
      setForm(response.data.data);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "update") {
        const data = { ...form, id };
        await API.put("/product/update", data);
        updateMessage("Stock updated successfully");
      } else {
        await API.post("product/add", form);
        updateMessage("Stock added successfully");
        setForm(initialValues);
      }
    } catch (err) {
      updateMessage("Failed to add product");
    }
    navigate("/dashboard");
  };
  const handleDelete = async () => {
    try {
      await API.post("/product/delete", { id });
      updateMessage("Deleted succesfully");
    } catch (err) {
      updateMessage("Failed to delete product");
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    if (mode === "update") {
      getDetails();
    }
  }, [mode, id]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="Name"
          value={form.Name}
          onChange={handleChange}
          placeholder="Item Name"
        />
        <input
          name="Category"
          value={form.Category}
          onChange={handleChange}
          placeholder="Item Category"
        />
        <input
          name="Stock"
          value={form.Stock}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
        />
        <input
          name="Price"
          value={form.Price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
        />
        <input
          name="Desc"
          value={form.Desc}
          onChange={handleChange}
          placeholder="Description"
          type="text"
        />
        <button type="submit">{mode === "update" ? "Update" : "Create"}</button>
        {mode == "update" && (
          <button className="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
      <div className="message">
        {message && (
          <div className={`toast`}>
            <span>{message}</span>
            <button className="close-btn" onClick={() => updateMessage("")}>
              &times;
            </button>
          </div>
        )}
      </div>
    </>
  );
}
