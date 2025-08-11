// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuth } from "../utils/auth";

const API_BASE = "http://localhost:8080";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setAuth({
        accessToken: data.accessToken,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      localStorage.setItem("olx_auth_ping", String(Date.now()));

      // go back to the page user wanted (if any)
      const next = location.state?.from?.pathname || "/";
      navigate(next, { replace: true });
    } catch (err) {
      alert(`Login failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="p-4 bg-white rounded shadow" style={{ width: "300px" }} onSubmit={handleLogin}>
        <h2 className="mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary w-100 mb-2" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button className="btn btn-link w-100" type="button" onClick={() => navigate("/signup")}>
          New user? Sign Up
        </button>
        <button className="btn btn-link w-100" type="button" onClick={() => navigate("/forgetPassword")}>
          Forget Password
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
