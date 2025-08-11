// src/utils/api.js
import { getAuth, clearAuth } from "./auth";

const API_BASE = "http://localhost:8080";

export async function apiFetch(path, options = {}) {
    const auth = getAuth();
    const headers = {
        Accept: "application/json",
        ...(options.headers || {}),
        ...(auth?.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
    };

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

    if (res.status === 401) {
        clearAuth();
        localStorage.setItem("olx_auth_ping", String(Date.now()));
    }
    return res;
}

export async function getJson(path) {
    const res = await apiFetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function postJson(path, body) {
    const res = await apiFetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
