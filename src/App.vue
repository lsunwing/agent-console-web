<template>
  <el-container class="app-root">
    <!-- 左侧导航栏 -->
    <el-aside width="220px" class="sidebar">
      <div class="brand">
        <el-icon :size="22"><ChatDotRound /></el-icon>
        <span>Agent Console</span>
      </div>

      <el-menu
        :default-active="active"
        class="sidebar-menu"
        @select="onSelect"
      >
        <el-menu-item index="/chat">
          <el-icon><ChatDotRound /></el-icon>
          <span>智能问答</span>
        </el-menu-item>
        <el-menu-item index="/rag">
          <el-icon><Collection /></el-icon>
          <span>RAG知识库</span>
        </el-menu-item>
        <el-menu-item index="/mcp">
          <el-icon><Connection /></el-icon>
          <span>MCP Server</span>
        </el-menu-item>
        <el-menu-item index="/tools">
          <el-icon><Tools /></el-icon>
          <span>Tool管理</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar-bottom">
        <div class="status-item">
          <span class="dot green"></span>
          <span>System Online</span>
        </div>
        <div class="sidebar-setting">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </div>
      </div>
    </el-aside>

    <!-- 右侧主区域 -->
    <el-container class="main-wrapper">
      <!-- 顶栏 -->
      <el-header class="top-header">
        <span class="page-title">{{ currentTitle }}</span>
        <div class="user-info">
          <span>Admin User</span>
          <div class="avatar">A</div>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="content-area">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChatDotRound, Collection, Connection, Tools, Setting } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const active = computed(() => route.path);
const currentTitle = computed(() => (route.meta?.title as string) || "Agent Console");

function onSelect(path: string) {
  if (path !== route.path) {
    router.push(path);
  }
}
</script>
