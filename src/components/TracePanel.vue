<template>
  <el-card shadow="never" class="panel-card">
    <template #header>
      <span>Agent Reasoning Timeline</span>
    </template>

    <el-timeline v-if="store.reasoningTimeline.length" class="timeline-main">
      <el-timeline-item
        v-for="(item, index) in store.reasoningTimeline"
        :key="`timeline-${index}`"
        :timestamp="formatTime(item.timestamp)"
        placement="top"
      >
        <el-card shadow="hover" class="timeline-card">
          <div class="timeline-header">
            <strong>{{ item.message }}</strong>
            <el-tag size="small" effect="plain">{{ item.stage }}</el-tag>
          </div>
          <div v-if="item.iteration !== undefined" class="meta">Iteration {{ item.iteration }}</div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-empty v-else description="暂无推理时间线" />

    <el-divider>高级详情</el-divider>

    <el-collapse>
      <el-collapse-item :title="`技术事件（${store.traces.length}）`" name="tech">
        <el-timeline v-if="store.traces.length">
          <el-timeline-item
            v-for="(item, index) in store.traces"
            :key="`trace-${index}`"
            :timestamp="formatTime(item.timestamp)"
            placement="top"
          >
            <el-card shadow="hover">
              <strong>{{ item.type }}</strong>
              <pre class="trace-detail">{{ item.detail }}</pre>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-empty v-else description="暂无技术事件" />
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup lang="ts">
import { useAgentStore } from "../stores/agent";

const store = useAgentStore();

function formatTime(value: string) {
  return new Date(value).toLocaleString();
}
</script>
