import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api"; // uses proxy if set

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        profilePic: null, // not sent in this request (JSON-only)
        isActive: true,
    });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [okMsg, setOkMsg] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "profilePic" ? files[0] : value,
        }));
    };

    const validate = () => {
        if (!formData.firstName.trim()) return "First name is required";
        if (!formData.lastName.trim()) return "Last name is required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email";
        if (!/^\d{10,12}$/.test(formData.mobileNumber))
            return "Mobile number must be 10–12 digits";
        if (formData.password.length < 8) return "Password must be at least 8 characters";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setOkMsg("");

        const v = validate();
        if (v) {
            setErr(v);
            return;
        }

        // Only send fields your backend expects in JSON
        const payload = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            mobileNumber: formData.mobileNumber.trim(),
            password: formData.password,
            isActive: true,
            // booleans (active/admin/etc.) omitted — backend should default them.
            // add here if your backend requires explicit values.
        };

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/users/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Try to parse JSON either way for message
            let data = null;
            try { data = await res.json(); } catch (_) { }

            if (!res.ok && res.status !== 201) {
                const msg =
                    (data && (data.message || data.error || data.errors?.[0])) ||
                    `HTTP ${res.status}`;
                throw new Error(msg);
            }

            const msg =
                (data && (data.message || data.msg)) ||
                (res.status === 201 ? "User registered successfully" : "Success");

            setOkMsg(msg);

            // Navigate to login (or home) after a brief pause
            setTimeout(() => navigate("/login"), 700);
        } catch (e2) {
            setErr(e2.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                className="p-4 bg-white rounded shadow"
                style={{ width: "350px" }}
                onSubmit={handleSubmit}
            // JSON request -> no multipart needed
            >
                <h2 className="mb-3 text-center">Sign Up</h2>

                {err && <div className="alert alert-danger py-2">{err}</div>}
                {okMsg && <div className="alert alert-success py-2">{okMsg}</div>}

                <input
                    type="text"
                    name="firstName"
                    className="form-control mb-3"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastName"
                    className="form-control mb-3"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    className="form-control mb-3"
                    placeholder="Password (min 8 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="mobileNumber"
                    className="form-control mb-3"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />



                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-2"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <button
                    type="button"
                    className="btn btn-link w-100"
                    onClick={() => navigate("/login")}
                    disabled={loading}
                >
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default Signup;
