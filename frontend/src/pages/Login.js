import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import "../styles/login.css";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { message,updateMessage } = useMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", { email, password });
      login(res.data.token);
      updateMessage("logged in succesfully");
      navigate("/dashboard");
    } catch (err) {
      updateMessage("Invalid login");

    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
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
    </div>
  );
};

export default Login;
