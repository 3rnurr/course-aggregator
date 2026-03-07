import { useState } from "react";
import api from "./api";
import "./styles.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);

      window.location.href = "/";
    } catch (error) {
      alert("Login failed");
      console.log(error.response);
    }
  };

  return (
  <div className="login-container">
    <h2>Login</h2>

    <input
      className="login-input"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      className="login-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
  </div>
);
}

export default Login;