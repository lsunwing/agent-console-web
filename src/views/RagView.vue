<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <div class="header-line">
        <span>RAG 知识库</span>
        <div class="header-actions">
          <el-input
            v-model="searchQuery"
            placeholder="搜索知识库..."
            clearable
            size="small"
            style="width: 220px; margin-right: 8px;"
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button :loading="searching" @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
          <el-upload
            :show-file-list="false"
            :before-upload="handleUpload"
            accept=".md,.txt,.log,.csv,.json,.docx,.xlsx,.pdf,.pptx"
          >
            <el-button type="primary" size="small" :loading="uploading">上传文档</el-button>
          </el-upload>
        </div>
      </div>
    </template>

    <el-row :gutter="16">
      <el-col :span="searchResults.length ? 14 : 24">
        <el-table
          :data="documents"
          v-loading="loading"
          border
          size="small"
          style="width: 100%"
          empty-text="暂无知识库文档，可上传 Word / Excel / PDF / PPT / Markdown / 日志"
          @row-click="handleRowClick"
          highlight-current-row
        >
          <el-table-column prop="fileName" label="文件名" min-width="200" />
          <el-table-column prop="fileType" label="类型" width="80">
            <template #default="{ row }">
              <el-tag size="small">{{ row.fileType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="chunkCount" label="Chunks" width="90" align="center" />
          <el-table-column label="大小" width="90" align="center">
            <template #default="{ row }">
              {{ formatSize(row.fileSize) }}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="上传时间" width="170" />
          <el-table-column label="操作" width="160" align="center">
            <template #default="{ row }">
              <el-button size="small" type="primary" link @click.stop="handleReindex(row)">重建索引</el-button>
              <el-popconfirm title="确认删除此文档及所有 chunks？" @confirm="handleDelete(row)">
                <template #reference>
                  <el-button size="small" type="danger" link @click.stop>删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col v-if="searchResults.length" :span="10">
        <el-card shadow="never" style="max-height: 500px; overflow-y: auto;">
          <template #header>
            <span>搜索结果 ({{ searchResults.length }})</span>
          </template>
          <div v-for="(chunk, index) in searchResults" :key="chunk.id" class="search-result-item">
            <div class="search-result-header">
              <span class="search-result-index">{{ index + 1 }}.</span>
              <span class="search-result-file">[{{ chunk.filePath }}]</span>
            </div>
            <div class="search-result-content">{{ chunk.content }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="detailVisible"
      :title="detailDoc?.document.fileName || '文档详情'"
      width="min(1100px, 94vw)"
      top="4vh"
      class="rag-detail-dialog"
      destroy-on-close
    >
      <div v-if="detailDoc" class="detail-info">
        <el-descriptions :column="4" size="small" border class="detail-meta">
          <el-descriptions-item label="文件名" :span="2">{{ detailDoc.document.fileName }}</el-descriptions-item>
          <el-descriptions-item label="类型">{{ detailDoc.document.fileType }}</el-descriptions-item>
          <el-descriptions-item label="Chunks">{{ detailDoc.chunks.length }}</el-descriptions-item>
        </el-descriptions>
        <div class="chunk-list">
          <div v-for="chunk in detailDoc.chunks" :key="chunk.id" class="chunk-item">
            <div class="chunk-header">
              <span>#{{ chunk.chunkIndex }}</span>
              <span class="chunk-len">{{ chunk.content.length }} 字</span>
            </div>
            <pre class="chunk-content">{{ chunk.content }}</pre>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  uploadDocument,
  listDocuments,
  getDocument,
  deleteDocument,
  reindexDocument,
  searchChunks,
  type RagDocument,
  type RagDocumentDetail,
  type RagChunk,
} from "../api/rag";

const documents = ref<RagDocument[]>([]);
const loading = ref(false);
const uploading = ref(false);
const searching = ref(false);
const searchQuery = ref("");
const searchResults = ref<RagChunk[]>([]);
const detailVisible = ref(false);
const detailDoc = ref<RagDocumentDetail | null>(null);

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

async function loadDocuments() {
  loading.value = true;
  try {
    documents.value = await listDocuments();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  } finally {
    loading.value = false;
  }
}

async function handleUpload(file: File) {
  uploading.value = true;
  try {
    await uploadDocument(file);
    ElMessage.success("上传成功: " + file.name);
    await loadDocuments();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  } finally {
    uploading.value = false;
  }
  return false;
}

async function handleSearch() {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  searching.value = true;
  try {
    searchResults.value = await searchChunks(searchQuery.value.trim());
    if (searchResults.value.length === 0) {
      ElMessage.info("未找到相关内容");
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  } finally {
    searching.value = false;
  }
}

async function handleRowClick(row: RagDocument) {
  try {
    detailDoc.value = await getDocument(row.id);
    detailVisible.value = true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  }
}

async function handleReindex(row: RagDocument) {
  try {
    await reindexDocument(row.id);
    ElMessage.success("重建索引完成");
    await loadDocuments();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  }
}

async function handleDelete(row: RagDocument) {
  try {
    await deleteDocument(row.id);
    ElMessage.success("已删除");
    await loadDocuments();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  }
}

onMounted(loadDocuments);
</script>

<style scoped>
.header-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-result-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-header {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.search-result-index {
  font-weight: 600;
  margin-right: 4px;
}

.search-result-file {
  color: #409eff;
}

.search-result-content {
  font-size: 13px;
  line-height: 1.5;
  color: #303133;
  word-break: break-word;
}

.detail-meta {
  margin-bottom: 14px;
}

.chunk-list {
  max-height: min(68vh, 720px);
  overflow-y: auto;
  padding-right: 4px;
}

.chunk-item {
  margin-bottom: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  overflow: hidden;
}

.chunk-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f7fa;
  padding: 6px 12px;
  font-size: 12px;
  color: #909399;
  font-weight: 600;
}

.chunk-len {
  font-weight: 400;
}

.chunk-content {
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Microsoft YaHei", monospace;
  color: #303133;
  background: #fff;
}
</style>

<style>
.rag-detail-dialog {
  max-width: 94vw;
}

.rag-detail-dialog .el-dialog__body {
  padding-top: 12px;
  padding-bottom: 16px;
}
</style>
