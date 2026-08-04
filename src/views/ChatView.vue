<template>
  <el-row :gutter="16">
    <el-col :xs="24" :lg="16">
      <ChatPanel />
    </el-col>
    <el-col :xs="24" :lg="8">
      <StatusPanel />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ChatPanel from "../components/ChatPanel.vue";
import StatusPanel from "../components/StatusPanel.vue";
</script>
