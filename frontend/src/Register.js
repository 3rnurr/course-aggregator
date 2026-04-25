import { useState } from "react";
import api from "./api";
import "./styles.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("register/", {
        username,
        email,
        password,
      });

      // After successful registration, redirect to login
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" onClick={handleRegister}>
        Register
      </button>

      <p className="register-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;