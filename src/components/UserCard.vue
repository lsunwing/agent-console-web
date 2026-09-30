<template>
  <el-popover placement="right-end" :width="240" trigger="click" popper-class="user-card-popover">
    <template #reference>
      <button class="user-card" type="button">
        <div class="avatar" :style="{ background: avatarColor }">{{ avatarLetter }}</div>
        <div class="meta">
          <div class="name">{{ displayName }}</div>
          <div class="sub">{{ username }} · {{ roleLabel }}</div>
        </div>
        <el-icon class="more"><MoreFilled /></el-icon>
      </button>
    </template>

    <div class="user-panel">
      <div class="panel-head">
        <div class="avatar" :style="{ background: avatarColor }">{{ avatarLetter }}</div>
        <div class="panel-meta">
          <div class="panel-name">{{ displayName }}</div>
          <div class="panel-role">{{ roleLabel }}</div>
        </div>
      </div>

      <div class="panel-rows">
        <div class="panel-row">
          <span class="label">用户名</span>
          <span class="value">{{ username }}</span>
        </div>
        <div class="panel-row">
          <span class="label">用户 ID</span>
          <span class="value">{{ user?.id ?? "-" }}</span>
        </div>
      </div>

      <el-button class="logout-btn" text type="danger" @click="onLogout">
        <el-icon><SwitchButton /></el-icon>
        <span>退出登录</span>
      </el-button>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { MoreFilled, SwitchButton } from "@element-plus/icons-vue";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const user = computed(() => auth.user);
const displayName = computed(() => user.value?.displayName || user.value?.username || "未登录");
const username = computed(() => user.value?.username || "-");
const avatarColor = computed(() => user.value?.avatarColor || "#2563eb");
const avatarLetter = computed(() => (displayName.value.trim().charAt(0) || "U").toUpperCase());
const roleLabel = computed(() => {
  const role = user.value?.role;
  if (role === "ADMIN") return "管理员";
  if (role === "USER") return "普通用户";
  return role || "用户";
});

async function onLogout() {
  try {
    await ElMessageBox.confirm("确定退出当前账号吗？", "退出登录", {
      confirmButtonText: "退出",
      cancelButtonText: "取消",
      type: "warning"
    });
  } catch {
    return;
  }
  await auth.logout();
  ElMessage.success("已退出登录");
  await router.replace("/login");
}
</script>

<style scoped>
.user-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.user-card:hover {
  background: #eef2ff;
  border-color: #dbe4ff;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.meta {
  flex: 1;
  min-width: 0;
}

.name {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sub {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more {
  color: #94a3b8;
  flex-shrink: 0;
}

.user-panel {
  padding: 4px 2px 2px;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px 12px;
  border-bottom: 1px solid #eef2f6;
}

.panel-meta {
  min-width: 0;
}

.panel-name {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.panel-role {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.panel-rows {
  padding: 10px 4px;
}

.panel-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  padding: 4px 0;
}

.panel-row .label {
  color: #94a3b8;
}

.panel-row .value {
  color: #334155;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
}

.logout-btn {
  width: 100%;
  justify-content: flex-start;
}
</style>
