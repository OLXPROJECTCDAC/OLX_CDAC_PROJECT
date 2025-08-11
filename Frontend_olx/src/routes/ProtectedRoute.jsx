import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { requireFreshSession } from "../utils/auth";

export default function ProtectedRoute() {
    const ok = requireFreshSession();
    const location = useLocation();
    return ok ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}
