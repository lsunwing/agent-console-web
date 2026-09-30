<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <div class="header-line">
        <span>Conversation</span>
        <div class="actions">
          <el-button size="small" @click="store.clearConversation">新会话</el-button>
          <el-button size="small" @click="traceVisible = true">Trace</el-button>
          <el-button size="small" type="danger" plain :disabled="!store.running" @click="store.stopStream">停止</el-button>
        </div>
      </div>
    </template>

    <div class="message-list">
      <div v-for="(item, index) in store.messages" :key="index" class="message-item" :class="item.role">
        <div class="meta">{{ item.role === "user" ? "用户" : "Agent" }} · {{ formatTime(item.time) }}</div>
        <MarkdownContent v-if="item.role === 'agent'" :content="item.content" class="content" />
        <div v-else class="content plain">{{ item.content }}</div>
      </div>

      <div v-if="store.assistantBuffer" class="message-item agent">
        <div class="meta">Agent · streaming...</div>
        <MarkdownContent :content="store.assistantBuffer" class="content" />
      </div>
    </div>

    <div class="composer">
      <el-input
        v-model="input"
        type="textarea"
        :rows="3"
        placeholder="输入消息并回车发送（Shift+Enter换行）"
        @keydown="onKeydown"
      />
      <el-button type="primary" :loading="store.running" @click="send">发送</el-button>
    </div>
  </el-card>

  <el-drawer v-model="traceVisible" title="Trace" direction="rtl" size="480px">
    <TracePanel />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useAgentStore } from "../stores/agent";
import TracePanel from "./TracePanel.vue";
import MarkdownContent from "./MarkdownContent.vue";

const store = useAgentStore();
const input = ref("");
const traceVisible = ref(false);

function formatTime(value: string) {
  return new Date(value).toLocaleString();
}

async function send() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  try {
    await store.sendMessage(text);
    input.value = "";
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    ElMessage.error(msg);
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
}
</script>

<style scoped>
.message-list {
  max-height: 480px;
  overflow: auto;
  margin-bottom: 12px;
}

.message-item {
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
}

.message-item.user {
  background: #ecf5ff;
}

.message-item.agent {
  background: #f8fafc;
  border: 1px solid #eef2f7;
}

.meta {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 8px;
}

.content {
  min-width: 0;
}

.content.plain {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.65;
  color: #1f2937;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: end;
}
</style>
