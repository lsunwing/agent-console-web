import router from "../router";
const TOKEN_HEADER = "Authorization";
const TOKEN_KEY = "agent_console_token";
export class ApiError extends Error {
    constructor(status, message) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
    }
}
function readAuthToken() {
    try {
        return localStorage.getItem(TOKEN_KEY);
    }
    catch {
        return null;
    }
}
function clearAuthToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
    }
    catch {
        // ignore
    }
}
export function authHeaders(extra = {}) {
    const headers = new Headers(extra);
    const token = readAuthToken();
    if (token) {
        headers.set(TOKEN_HEADER, `Bearer ${token}`);
    }
    return headers;
}
async function parseError(response) {
    let message = `请求失败: ${response.status}`;
    try {
        const data = await response.json();
        if (data?.error) {
            message = String(data.error);
        }
        else if (data?.message) {
            message = String(data.message);
        }
    }
    catch {
        // keep default message
    }
    return new ApiError(response.status, message);
}
async function handleUnauthorized() {
    clearAuthToken();
    // 让 Pinia 会话状态也失效（动态引入，避免与 auth store 循环依赖）
    try {
        const { useAuthStore } = await import("../stores/auth");
        useAuthStore().clearSession();
    }
    catch {
        // store may not be ready
    }
    const current = router.currentRoute.value;
    if (current.path !== "/login") {
        await router.replace({
            path: "/login",
            query: { redirect: current.fullPath }
        });
    }
}
export async function apiJson(input, init = {}) {
    const headers = authHeaders(init.headers);
    if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }
    const response = await fetch(input, {
        ...init,
        headers
    });
    if (response.status === 401) {
        await handleUnauthorized();
        throw new ApiError(401, "未登录或登录已过期");
    }
    if (!response.ok) {
        throw await parseError(response);
    }
    if (response.status === 204) {
        return undefined;
    }
    return (await response.json());
}
