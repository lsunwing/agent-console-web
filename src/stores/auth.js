import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchMe, login as loginApi, logout as logoutApi } from "../api/auth";
const TOKEN_KEY = "agent_console_token";
function readToken() {
    try {
        return localStorage.getItem(TOKEN_KEY);
    }
    catch {
        return null;
    }
}
function writeToken(token) {
    try {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        }
        else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }
    catch {
        // ignore storage failures
    }
}
export const useAuthStore = defineStore("auth", () => {
    const token = ref(readToken());
    const user = ref(null);
    const bootstrapped = ref(false);
    const loading = ref(false);
    const isLoggedIn = computed(() => Boolean(token.value && user.value));
    function setSession(nextToken, nextUser) {
        token.value = nextToken;
        user.value = nextUser;
        writeToken(nextToken);
    }
    function clearSession() {
        token.value = null;
        user.value = null;
        writeToken(null);
        bootstrapped.value = true;
    }
    async function bootstrap() {
        if (bootstrapped.value) {
            return;
        }
        if (!token.value) {
            bootstrapped.value = true;
            return;
        }
        loading.value = true;
        try {
            user.value = await fetchMe();
        }
        catch {
            clearSession();
        }
        finally {
            loading.value = false;
            bootstrapped.value = true;
        }
    }
    async function login(username, password) {
        loading.value = true;
        try {
            const result = await loginApi(username, password);
            setSession(result.token, result.user);
        }
        finally {
            loading.value = false;
        }
    }
    function applyLoginResult(result) {
        setSession(result.token, result.user);
    }
    async function logout() {
        try {
            if (token.value) {
                await logoutApi();
            }
        }
        catch {
            // ignore server-side logout failures
        }
        finally {
            clearSession();
        }
    }
    return {
        token,
        user,
        loading,
        bootstrapped,
        isLoggedIn,
        bootstrap,
        login,
        applyLoginResult,
        logout,
        clearSession
    };
});
