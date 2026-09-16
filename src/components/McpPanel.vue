<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <div class="header-line">
        <span>MCP Server 管理</span>
        <el-button size="small" :loading="loading" @click="loadServers">刷新</el-button>
      </div>
    </template>

    <el-row :gutter="16" v-loading="loading">
      <el-col :span="6">
        <div class="server-list">
          <div v-if="!servers.length && !loading" class="muted" style="padding:20px;text-align:center;">暂无MCP服务器</div>
          <div
            v-for="server in servers"
            :key="server.name"
            class="server-item"
            :class="{ active: selectedServer?.name === server.name }"
            @click="selectServer(server)"
          >
            <div class="server-name">
              <span class="status-dot" :class="server.processAlive ? 'alive' : 'dead'" />
              {{ server.name }}
            </div>
            <div class="server-meta">
              <el-tag v-if="server.enabled" size="small" type="success">已启用</el-tag>
              <el-tag v-else size="small" type="info">已禁用</el-tag>
              <el-tag v-if="server.initialized" size="small" type="primary">已初始化</el-tag>
              <span class="muted tool-count">{{ server.tools.length }} tools</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div v-if="!selectedServer" class="muted" style="padding:40px;text-align:center;">请从左侧选择一个MCP服务器</div>

        <div v-else>
          <el-descriptions :column="2" size="small" border style="margin-bottom:16px;">
            <el-descriptions-item label="服务器名称">{{ selectedServer.name }}</el-descriptions-item>
            <el-descriptions-item label="进程状态">
              <el-tag :type="selectedServer.processAlive ? 'success' : 'danger'" size="small">
                {{ selectedServer.processAlive ? '运行中' : '已停止' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="命令">{{ selectedServer.command }}</el-descriptions-item>
            <el-descriptions-item label="参数">{{ selectedServer.args.join(" ") || "-" }}</el-descriptions-item>
            <el-descriptions-item v-if="selectedServer.lastError" label="最近错误" :span="2">
              <span style="color:#f56c6c;">{{ selectedServer.lastError }}</span>
            </el-descriptions-item>
          </el-descriptions>

          <h4 style="margin:12px 0 8px;">Tools ({{ selectedServer.tools.length }})</h4>
          <el-table :data="selectedServer.tools" border size="small" style="width:100%">
            <el-table-column prop="name" label="Name" min-width="150" />
            <el-table-column prop="description" label="Description" min-width="250" />
            <el-table-column label="Input Schema" min-width="280">
              <template #default="scope">
                <pre class="trace-detail">{{ stringify(scope.row.inputSchema || {}) }}</pre>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { fetchMcpServers, type McpServerDetail } from "../api/mcp";

const servers = ref<McpServerDetail[]>([]);
const selectedServer = ref<McpServerDetail | null>(null);
const loading = ref(false);

function stringify(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function selectServer(server: McpServerDetail) {
  selectedServer.value = server;
}

async function loadServers() {
  loading.value = true;
  try {
    servers.value = await fetchMcpServers();
    if (selectedServer.value) {
      const found = servers.value.find((s) => s.name === selectedServer.value!.name);
      selectedServer.value = found || servers.value[0] || null;
    } else if (servers.value.length) {
      selectedServer.value = servers.value[0];
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  } finally {
    loading.value = false;
  }
}

onMounted(loadServers);
</script>

<style scoped>
.server-list {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  min-height: 300px;
}

.server-item {
  padding: 12px 14px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.15s;
}

.server-item:last-child {
  border-bottom: none;
}

.server-item:hover {
  background: #f5f7fa;
}

.server-item.active {
  background: #ecf5ff;
  border-left: 3px solid #409eff;
  padding-left: 11px;
}

.server-name {
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.server-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.status-dot.alive {
  background: #67c23a;
}

.status-dot.dead {
  background: #f56c6c;
}

.tool-count {
  margin-left: auto;
  font-size: 12px;
}
</style>
