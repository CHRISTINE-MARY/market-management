import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./features/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import StockForm from "./pages/StockForm";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import "./App.css"
import { MessageProvider } from "./context/MessageContext";
export default function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stockForm"
              element={
                <ProtectedRoute>
                  <StockForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}
