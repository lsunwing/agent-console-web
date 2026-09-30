import type { AuthUser, LoginResponse } from "../types/auth";
import { apiJson } from "./http";

export async function login(username: string, password: string): Promise<LoginResponse> {
  return apiJson<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export async function fetchMe(): Promise<AuthUser> {
  return apiJson<AuthUser>("/api/auth/me");
}

export async function logout(): Promise<void> {
  await apiJson<void>("/api/auth/logout", { method: "POST" });
}
