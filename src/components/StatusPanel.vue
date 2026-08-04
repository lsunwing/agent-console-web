<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <span>Agent 状态</span>
    </template>

    <el-descriptions :column="1" size="small" border>
      <el-descriptions-item label="ConversationId">
        {{ store.conversationId || "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="FinishReason">
        {{ store.finishReason || "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="Prompt Tokens">
        {{ store.usage.promptTokens ?? "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="Completion Tokens">
        {{ store.usage.completionTokens ?? "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="Total Tokens">
        {{ store.usage.totalTokens ?? "-" }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="tool-tags">
      <el-tag v-for="name in store.calledToolNames" :key="name" size="small" type="success">{{ name }}</el-tag>
      <span v-if="!store.calledToolNames.length" class="muted">暂无工具调用</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useAgentStore } from "../stores/agent";

const store = useAgentStore();
</script>
