import React, { useState } from "react";
import Products from "../features/Product";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import "../styles/dashboard.css";
export default function Dashboard() {
  const currDate = new Date();
  const { logout } = useAuth();
  const { message, updateMessage } = useMessage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className="date">{currDate.toISOString().split("T")[0]}</aside>
      <nav className="actions">
        <Link to="/overview" className="link">
          Overview
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <Link
        to="/stockForm"
        state={{ id: "", mode: "create" }}
        className="addProduct"
      >
        +Add product
      </Link>
      <main className="products">
        <Products />
      </main>
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
    </div>
  );
}
