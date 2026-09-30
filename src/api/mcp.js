import { authHeaders } from "./http";
export async function fetchMcpServers() {
    const response = await fetch("/api/mcp/servers", {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`加载MCP服务器列表失败: ${response.status}`);
    }
    return (await response.json());
}
