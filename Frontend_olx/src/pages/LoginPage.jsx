// src/pages/LoginPage.jsx
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { setAuth, isAdmin, isAdminToken } from "../utils/auth";

// const API_BASE = "http://localhost:8080";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return;

//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "*/*" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(text || `HTTP ${res.status}`);
//       }
//       const adminFlag = (data.isAdmin ?? data.admin ?? false);
//       const data = await res.json();
//       setAuth({
//         accessToken: data.accessToken,
//         email: data.email,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         isAdmin: adminFlag,

//       });

//       localStorage.setItem("olx_auth_ping", String(Date.now()));

//       // go back to intended page, else AdminPanel if token has ADMIN role, else home
//       // const from = location.state?.from?.pathname;
//       // const next = from ? from : (isAdminToken(data.accessToken) ? "/AdminPanel" : "/");
//       const from = location.state?.from?.pathname;
//       // const next = from ? from : (data.isAdmin ? "/AdminPanel" : "/");
//       const next = from ? from : (adminFlag ? "/AdminPanel" : "/");
//       navigate(next, { replace: true });


//     } catch (err) {
//       alert(`Login failed: ${err.message || err}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <form className="p-4 bg-white rounded shadow" style={{ width: "300px" }} onSubmit={handleLogin}>
//         <h2 className="mb-4 text-center">Login</h2>
//         <input
//           type="email"
//           name="email"
//           className="form-control mb-3"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled={loading}
//         />
//         <input
//           type="password"
//           name="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           disabled={loading}
//         />
//         <button className="btn btn-primary w-100 mb-2" type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <button className="btn btn-link w-100" type="button" onClick={() => navigate("/signup")}>
//           New user? Sign Up
//         </button>
//         <button className="btn btn-link w-100" type="button" onClick={() => navigate("/forgetPassword")}>
//           Forget Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;


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

      // 1) Parse response
      const data = await res.json();

      // 2) Derive admin flag (backend may send `isAdmin` or `admin`)
      const adminFlag = (data.isAdmin ?? data.admin ?? false);

      // 3) Save auth payload (now supports isAdmin)
      setAuth({
        accessToken: data.accessToken,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isAdmin: !!adminFlag,
      });

      // 4) Broadcast login to other tabs
      localStorage.setItem("olx_auth_ping", String(Date.now()));

      // 5) Redirect: back to intended page, else AdminPanel if admin, else home
      const from = location.state?.from?.pathname;
      const next = from ? from : (adminFlag ? "/AdminPanel" : "/");
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

        <button className="btn btn-link w-100" type="button" onClick={() => navigate("/signup")} disabled={loading}>
          New user? Sign Up
        </button>

        <button className="btn btn-link w-100" type="button" onClick={() => navigate("/forgetPassword")} disabled={loading}>
          Forget Password
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

