<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <div class="header-line">
        <span>注册工具列表</span>
        <el-button size="small" :loading="loading" @click="loadTools">刷新</el-button>
      </div>
    </template>

    <el-table :data="store.tools" border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="Name" min-width="160" />
      <el-table-column prop="description" label="Description" min-width="280" />
      <el-table-column label="Input Schema" min-width="280">
        <template #default="scope">
          <pre class="trace-detail">{{ stringify(scope.row.inputSchema || {}) }}</pre>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { fetchTools } from "../api/tools";
import { useAgentStore } from "../stores/agent";

const store = useAgentStore();
const loading = ref(false);

function stringify(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

async function loadTools() {
  loading.value = true;
  try {
    store.setTools(await fetchTools());
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  } finally {
    loading.value = false;
  }
}

onMounted(loadTools);
</script>
