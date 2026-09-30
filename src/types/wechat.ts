import type { AuthUser, LoginResponse } from "./auth";

export interface WeChatQrResponse {
  ticket: string;
  qrContent: string;
  mode: "mock" | "open-platform" | string;
  expireIn: number;
  mockEnabled: boolean;
}

export type WeChatStatus = "WAITING" | "SCANNED" | "CONFIRMED" | "EXPIRED" | "INVALID" | string;

export interface WeChatStatusResponse {
  status: WeChatStatus;
  token?: string | null;
  user?: AuthUser | null;
  expiresIn: number;
}

export type WeChatLoginResult = LoginResponse;
