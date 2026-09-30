import { apiJson } from "./http";
export async function login(username, password) {
    return apiJson("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });
}
export async function fetchMe() {
    return apiJson("/api/auth/me");
}
export async function logout() {
    await apiJson("/api/auth/logout", { method: "POST" });
}
