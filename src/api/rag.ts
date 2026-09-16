export interface RagDocument {
  id: number;
  fileName: string;
  fileType: string;
  chunkCount: number;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface RagChunk {
  id: number;
  chunkIndex: number;
  content: string;
  filePath: string;
}

export interface RagDocumentDetail {
  document: RagDocument;
  chunks: RagChunk[];
}

export async function uploadDocument(file: File): Promise<RagDocument> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/rag/documents", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `上传失败: ${response.status}`);
  }
  return (await response.json()) as RagDocument;
}

export async function listDocuments(): Promise<RagDocument[]> {
  const response = await fetch("/api/rag/documents");
  if (!response.ok) {
    throw new Error(`加载文档列表失败: ${response.status}`);
  }
  return (await response.json()) as RagDocument[];
}

export async function getDocument(id: number): Promise<RagDocumentDetail> {
  const response = await fetch(`/api/rag/documents/${id}`);
  if (!response.ok) {
    throw new Error(`加载文档详情失败: ${response.status}`);
  }
  return (await response.json()) as RagDocumentDetail;
}

export async function deleteDocument(id: number): Promise<void> {
  const response = await fetch(`/api/rag/documents/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`删除失败: ${response.status}`);
  }
}

export async function reindexDocument(id: number): Promise<RagDocument> {
  const response = await fetch(`/api/rag/documents/${id}/reindex`, { method: "POST" });
  if (!response.ok) {
    throw new Error(`重建索引失败: ${response.status}`);
  }
  return (await response.json()) as RagDocument;
}

export async function searchChunks(query: string, limit = 5): Promise<RagChunk[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const response = await fetch(`/api/rag/search?${params}`);
  if (!response.ok) {
    throw new Error(`搜索失败: ${response.status}`);
  }
  return (await response.json()) as RagChunk[];
}
