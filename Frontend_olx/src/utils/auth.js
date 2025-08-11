// // src/utils/auth.js
// import { isJwtExpired } from "./jwt";

// const KEY = "olx_auth";

// // export function setAuth({ accessToken, email, firstName, lastName }) {
// //     const payload = { accessToken, email, firstName, lastName, ts: Date.now() };
// export function setAuth({ accessToken, email, firstName, lastName, isAdmin }) {
//     const payload = { accessToken, email, firstName, lastName, isAdmin: !!isAdmin, ts: Date.now() };

//     localStorage.setItem(KEY, JSON.stringify(payload));
// }

// export function getAuth() {
//     try {
//         const raw = localStorage.getItem(KEY);
//         return raw ? JSON.parse(raw) : null;
//     } catch {
//         return null;
//     }
// }

// export function clearAuth() {
//     localStorage.removeItem(KEY);
// }

// export function isLoggedIn() {
//     const a = getAuth();
//     return !!(a && a.accessToken);
// }

// export function getUserInitial() {
//     const a = getAuth();
//     if (!a) return "";
//     const f = (a.firstName || "").trim();
//     const l = (a.lastName || "").trim();
//     if (f && l) return (f[0] + l[0]).toUpperCase();
//     if (f) return f[0].toUpperCase();
//     if (l) return l[0].toUpperCase();
//     return (a.email?.[0] || "").toUpperCase();
// }

// // --- expiry helpers ---
// export function isSessionValid() {
//     const a = getAuth();
//     if (!a?.accessToken) return false;
//     return !isJwtExpired(a.accessToken);
// }

// export function requireFreshSession() {
//     if (!isSessionValid()) {
//         clearAuth();
//         localStorage.setItem("olx_auth_ping", String(Date.now()));
//         return false;
//     }
//     return true;
// }


// export async function logout({ serverLogout = false, apiBase = "" } = {}) {
//     try {
//         if (serverLogout && apiBase) {
//             await fetch(`${apiBase}/auth/logout`, {
//                 method: "POST",
//                 credentials: "include",
//             });
//         }
//     } catch {
//         // ignore network errors; still clear client state
//     } finally {
//         clearAuth();
//         localStorage.setItem("olx_auth_ping", String(Date.now()));
//     }
// }

// import { decodeJwt } from "./jwt";

// export function getRoles() {
//     const a = getAuth();
//     if (!a?.accessToken) return [];
//     const p = decodeJwt(a.accessToken);
//     // Adjust keys to match your token claims: roles / authorities / scope
//     let roles = p?.roles || p?.authorities || (p?.scope ? p.scope.split(" ") : []);
//     if (!Array.isArray(roles)) roles = roles ? [roles] : [];
//     return roles;
// }

// export function isAdmin() {
//     return getRoles().some(r => String(r).toUpperCase().includes("ADMIN"));
// }


// export function getRolesFromToken(token) {
//     const p = decodeJwt(token);
//     if (!p) return [];

//     // Common claim shapes from Spring Security JWTs
//     let roles =
//         p.roles ??
//         p.authorities ??
//         p.role ??
//         p.scope ??
//         p.scp ??
//         [];

//     // If it's a single string like "ROLE_ADMIN ROLE_USER"
//     if (typeof roles === "string") {
//         roles = roles.split(/[,\s]+/).filter(Boolean);
//     }

//     // If it's objects like [{authority:"ROLE_ADMIN"}]
//     if (Array.isArray(roles) && roles.length && typeof roles[0] === "object") {
//         roles = roles.map(r => r.authority || r.role || r.name).filter(Boolean);
//     }

//     return Array.isArray(roles) ? roles : [];
// }

// export function isAdminToken(token) {
//     return getRolesFromToken(token).some(r =>
//         String(r).toUpperCase().includes("ADMIN")
//     );
// }

// src/utils/auth.js
import { isJwtExpired, decodeJwt } from "./jwt";

const KEY = "olx_auth";
const PING_KEY = "olx_auth_ping";

/**
 * Save auth payload to localStorage.
 * Accepts optional isAdmin flag from backend (boolean).
 */
export function setAuth({ accessToken, email, firstName, lastName, isAdmin }) {
    const payload = {
        accessToken,
        email,
        firstName,
        lastName,
        isAdmin: !!isAdmin,
        ts: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
    localStorage.setItem(PING_KEY, String(Date.now()));
}

/** Read auth payload from localStorage. */
export function getAuth() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/** Remove auth payload (client-side logout). */
export function clearAuth() {
    localStorage.removeItem(KEY);
}

/** Is there a token stored? (does not check expiry) */
export function isLoggedIn() {
    const a = getAuth();
    return !!(a && a.accessToken);
}

/** Initials for avatar display. */
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

/** Validate session using JWT exp claim. */
export function isSessionValid() {
    const a = getAuth();
    if (!a?.accessToken) return false;
    return !isJwtExpired(a.accessToken);
}

/**
 * Ensure session is fresh; if not, clear and broadcast.
 * Returns true if session valid, false otherwise.
 */
export function requireFreshSession() {
    if (!isSessionValid()) {
        clearAuth();
        localStorage.setItem(PING_KEY, String(Date.now()));
        return false;
    }
    return true;
}

/**
 * Unified logout. Optionally call server-side logout endpoint
 * when using cookies/refresh tokens.
 */
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
        localStorage.setItem(PING_KEY, String(Date.now()));
    }
}

/**
 * Extract roles/authorities from an already-stored token.
 * Supports multiple common claim shapes:
 * - roles: ["ROLE_USER","ROLE_ADMIN"]
 * - authorities: [{authority:"ROLE_ADMIN"}, ...]
 * - scope / scp: "ROLE_USER ROLE_ADMIN"
 * - role: "ROLE_ADMIN"
 */
export function getRoles() {
    const a = getAuth();
    if (!a?.accessToken) return [];
    return getRolesFromToken(a.accessToken);
}

/** True if any role contains "ADMIN". */
export function isAdmin() {
    return getRoles().some((r) => String(r).toUpperCase().includes("ADMIN"));
}

/** Extract roles from a provided JWT string (no storage needed). */
export function getRolesFromToken(token) {
    const p = decodeJwt(token);
    if (!p) return [];

    let roles =
        p.roles ??
        p.authorities ??
        p.role ??
        p.scope ??
        p.scp ??
        [];

    // scope/scp as string: "ROLE_USER ROLE_ADMIN"
    if (typeof roles === "string") {
        roles = roles.split(/[,\s]+/).filter(Boolean);
    }

    // authorities as objects: [{authority:"ROLE_ADMIN"}]
    if (Array.isArray(roles) && roles.length && typeof roles[0] === "object") {
        roles = roles
            .map((r) => r?.authority || r?.role || r?.name)
            .filter(Boolean);
    }

    return Array.isArray(roles) ? roles : [];
}

/** True if the provided token has an ADMIN role. */
export function isAdminToken(token) {
    return getRolesFromToken(token).some((r) =>
        String(r).toUpperCase().includes("ADMIN")
    );
}

// (Optional) export keys for tests or other modules
export const AUTH_STORAGE_KEY = KEY;
export const AUTH_PING_KEY = PING_KEY;
