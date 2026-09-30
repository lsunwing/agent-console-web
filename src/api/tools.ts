import type { ToolDefinition } from "../types/agent";
import { authHeaders } from "./http";

export async function fetchTools() {
  const response = await fetch("/api/tools", {
    headers: authHeaders()
  });
  if (!response.ok) {
    throw new Error(`加载工具失败: ${response.status}`);
  }
  return (await response.json()) as ToolDefinition[];
}
