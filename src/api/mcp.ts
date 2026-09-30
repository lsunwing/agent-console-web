import { authHeaders } from "./http";

export interface McpToolDescriptor {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
}

export interface McpServerDetail {
  name: string;
  enabled: boolean;
  initialized: boolean;
  processAlive: boolean;
  command: string;
  args: string[];
  tools: McpToolDescriptor[];
  lastError: string;
  lastInitializedAt?: string;
  lastToolsRefreshAt?: string;
  lastCallAt?: string;
}

export async function fetchMcpServers(): Promise<McpServerDetail[]> {
  const response = await fetch("/api/mcp/servers", {
    headers: authHeaders()
  });
  if (!response.ok) {
    throw new Error(`加载MCP服务器列表失败: ${response.status}`);
  }
  return (await response.json()) as McpServerDetail[];
}
