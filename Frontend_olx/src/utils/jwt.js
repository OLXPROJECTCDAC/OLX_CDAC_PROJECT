// src/utils/jwt.js
export function decodeJwt(token = "") {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = atob(base64);
        return JSON.parse(json) || null;
    } catch {
        return null;
    }
}

export function getJwtExpiryMs(token = "") {
    const p = decodeJwt(token);
    return p?.exp ? p.exp * 1000 : null;
}

export function isJwtExpired(token = "", skewMs = 5000) {
    const expMs = getJwtExpiryMs(token);
    if (!expMs) return false;
    return Date.now() + skewMs >= expMs;
}

