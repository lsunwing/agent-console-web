import type { LoginResponse } from "../types/auth";
import type { WeChatQrResponse, WeChatStatusResponse } from "../types/wechat";
import { apiJson } from "./http";

export async function fetchWeChatQrCode(): Promise<WeChatQrResponse> {
  return apiJson<WeChatQrResponse>("/api/auth/wechat/qrcode");
}

export async function fetchWeChatStatus(ticket: string): Promise<WeChatStatusResponse> {
  return apiJson<WeChatStatusResponse>(`/api/auth/wechat/status?ticket=${encodeURIComponent(ticket)}`);
}

export async function mockWeChatLogin(ticket: string): Promise<LoginResponse> {
  return apiJson<LoginResponse>(`/api/auth/wechat/tickets/${encodeURIComponent(ticket)}/mock-login`, {
    method: "POST"
  });
}
