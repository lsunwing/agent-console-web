<template>
  <el-container class="app-root">
    <el-header class="header">
      <div class="title">Agent Console</div>
      <el-menu :default-active="active" mode="horizontal" @select="onSelect">
        <el-menu-item index="/chat">Chat</el-menu-item>
        <el-menu-item index="/trace">Trace</el-menu-item>
        <el-menu-item index="/tools">Tools</el-menu-item>
      </el-menu>
    </el-header>

    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const active = computed(() => route.path);

function onSelect(path: string) {
  if (path !== route.path) {
    router.push(path);
  }
}
</script>
