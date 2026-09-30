import { authHeaders } from "./http";
export async function uploadDocument(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/rag/documents", {
        method: "POST",
        headers: authHeaders(),
        body: formData,
    });
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `上传失败: ${response.status}`);
    }
    return (await response.json());
}
export async function listDocuments() {
    const response = await fetch("/api/rag/documents", {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`加载文档列表失败: ${response.status}`);
    }
    return (await response.json());
}
export async function getDocument(id) {
    const response = await fetch(`/api/rag/documents/${id}`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`加载文档详情失败: ${response.status}`);
    }
    return (await response.json());
}
export async function deleteDocument(id) {
    const response = await fetch(`/api/rag/documents/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`删除失败: ${response.status}`);
    }
}
export async function reindexDocument(id) {
    const response = await fetch(`/api/rag/documents/${id}/reindex`, {
        method: "POST",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`重建索引失败: ${response.status}`);
    }
    return (await response.json());
}
export async function searchChunks(query, limit = 5) {
    const params = new URLSearchParams({ q: query, limit: String(limit) });
    const response = await fetch(`/api/rag/search?${params}`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(`搜索失败: ${response.status}`);
    }
    return (await response.json());
}
