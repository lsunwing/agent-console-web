<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <div class="header-line">
        <span>Conversation</span>
        <div class="actions">
          <el-button size="small" @click="store.clearConversation">新会话</el-button>
          <el-button size="small" type="danger" plain :disabled="!store.running" @click="store.stopStream">停止</el-button>
        </div>
      </div>
    </template>

    <div class="message-list">
      <div v-for="(item, index) in store.messages" :key="index" class="message-item" :class="item.role">
        <div class="meta">{{ item.role === "user" ? "用户" : "Agent" }} · {{ formatTime(item.time) }}</div>
        <pre class="content">{{ item.content }}</pre>
      </div>

      <div v-if="store.assistantBuffer" class="message-item agent">
        <div class="meta">Agent · streaming...</div>
        <pre class="content">{{ store.assistantBuffer }}</pre>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useAgentStore } from "../stores/agent";

const store = useAgentStore();
const input = ref("");

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
