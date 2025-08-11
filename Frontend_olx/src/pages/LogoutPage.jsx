// src/pages/LogoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        clearAuth();
        navigate("/login", { replace: true });
    }, [navigate]);

    return null; // or a spinner/loading message
}

export default LogoutPage;
