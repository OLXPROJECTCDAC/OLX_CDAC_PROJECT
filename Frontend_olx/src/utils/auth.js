// src/utils/auth.js
import { isJwtExpired } from "./jwt";

const KEY = "olx_auth";

export function setAuth({ accessToken, email, firstName, lastName }) {
    const payload = { accessToken, email, firstName, lastName, ts: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(payload));
}

export function getAuth() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function clearAuth() {
    localStorage.removeItem(KEY);
}

export function isLoggedIn() {
    const a = getAuth();
    return !!(a && a.accessToken);
}

export function getUserInitial() {
    const a = getAuth();
    if (!a) return "";
    const f = (a.firstName || "").trim();
    const l = (a.lastName || "").trim();
    if (f && l) return (f[0] + l[0]).toUpperCase();
    if (f) return f[0].toUpperCase();
    if (l) return l[0].toUpperCase();
    return (a.email?.[0] || "").toUpperCase();
}

// --- expiry helpers ---
export function isSessionValid() {
    const a = getAuth();
    if (!a?.accessToken) return false;
    return !isJwtExpired(a.accessToken);
}

export function requireFreshSession() {
    if (!isSessionValid()) {
        clearAuth();
        localStorage.setItem("olx_auth_ping", String(Date.now()));
        return false;
    }
    return true;
}


export async function logout({ serverLogout = false, apiBase = "" } = {}) {
    try {
        if (serverLogout && apiBase) {
            await fetch(`${apiBase}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        }
    } catch {
        // ignore network errors; still clear client state
    } finally {
        clearAuth();
        localStorage.setItem("olx_auth_ping", String(Date.now()));
    }
}

