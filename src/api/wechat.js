import { apiJson } from "./http";
export async function fetchWeChatQrCode() {
    return apiJson("/api/auth/wechat/qrcode");
}
export async function fetchWeChatStatus(ticket) {
    return apiJson(`/api/auth/wechat/status?ticket=${encodeURIComponent(ticket)}`);
}
export async function mockWeChatLogin(ticket) {
    return apiJson(`/api/auth/wechat/tickets/${encodeURIComponent(ticket)}/mock-login`, {
        method: "POST"
    });
}
