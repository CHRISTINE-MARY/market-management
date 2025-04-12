import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import "../styles/login.css";

const Register = () => {
  const { login } = useAuth();
  const { message, updateMessage } = useMessage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/register", { name, email, password });
      updateMessage("Registered successfully");
      navigate("/");
    } catch (err) {
      updateMessage("registration  failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <div className="message">
        {message && (
          <div className="toast">
            <span>{message}</span>
            <button className="close-btn" onClick={() => updateMessage("")}>
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
