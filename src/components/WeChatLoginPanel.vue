<template>
  <div class="wechat-panel">
    <div class="wechat-title">
      <span class="wechat-logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="#07c160"
            d="M9.5 4C5.36 4 2 6.91 2 10.5c0 2.05 1.12 3.88 2.88 5.08l-.72 2.16 2.5-1.25c.86.24 1.78.37 2.74.37.3 0 .6-.02.9-.05A5.3 5.3 0 0 1 9.5 15c-3.31 0-6-2.46-6-5.5S6.19 4 9.5 4zm-2.2 3.2a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9zm4.4 0a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9z"
          />
          <path
            fill="#07c160"
            d="M15.2 9.2c-3.04 0-5.5 2.24-5.5 5s2.46 5 5.5 5c.66 0 1.3-.1 1.9-.28l2.2 1.1-.6-1.8c1.55-1 2.5-2.5 2.5-4.02 0-2.76-2.46-5-5.5-5zm-1.9 3.1a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm3.8 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
          />
        </svg>
      </span>
      <span>微信扫码登录</span>
    </div>

    <div class="qr-box">
      <div v-if="qrDataUrl" class="qr-img-wrap">
        <img :src="qrDataUrl" alt="微信登录二维码" class="qr-img" />
        <div v-if="status === 'SCANNED'" class="qr-mask">
          <el-icon :size="28"><CircleCheckFilled /></el-icon>
          <span>已扫描</span>
        </div>
        <div v-if="isExpired" class="qr-mask expired" @click="refresh">
          <el-icon :size="28"><Refresh /></el-icon>
          <span>二维码已过期<br />点击刷新</span>
        </div>
      </div>
      <div v-else class="qr-placeholder">
        <el-icon :size="28"><Loading /></el-icon>
        <span>二维码加载中…</span>
      </div>
    </div>

    <p class="qr-tip">{{ tipText }}</p>

    <el-button
      v-if="mockEnabled"
      class="mock-btn"
      plain
      type="success"
      :loading="mockLoading"
      @click="onMockLogin"
    >
      模拟扫码登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { CircleCheckFilled, Loading, Refresh } from "@element-plus/icons-vue";
import QRCode from "qrcode";
import { fetchWeChatQrCode, fetchWeChatStatus, mockWeChatLogin } from "../api/wechat";
import type { WeChatQrResponse, WeChatStatus } from "../types/wechat";
import type { LoginResponse } from "../types/auth";

const emit = defineEmits<{
  success: [result: LoginResponse];
}>();

const qrInfo = ref<WeChatQrResponse | null>(null);
const qrDataUrl = ref("");
const status = ref<WeChatStatus>("WAITING");
const expireIn = ref(0);
const mockLoading = ref(false);
const loadingQr = ref(false);

let pollTimer: number | null = null;

const mockEnabled = computed(() => Boolean(qrInfo.value?.mockEnabled));
const isExpired = computed(() => status.value === "EXPIRED" || status.value === "INVALID" || expireIn.value <= 0);

const tipText = computed(() => {
  if (status.value === "SCANNED") {
    return "已扫描，请在微信中确认登录";
  }
  if (isExpired.value) {
    return "二维码已过期，点击刷新";
  }
  return "打开微信「扫一扫」登录";
});

function stopPolling() {
  if (pollTimer !== null) {
    window.clearInterval(pollTimer);
    pollTimer = null;
  }
}

function startPolling() {
  stopPolling();
  pollTimer = window.setInterval(async () => {
    const ticket = qrInfo.value?.ticket;
    if (!ticket || isExpired.value) {
      return;
    }
    try {
      const result = await fetchWeChatStatus(ticket);
      status.value = result.status;
      expireIn.value = result.expiresIn ?? 0;
      if (result.status === "CONFIRMED" && result.token && result.user) {
        stopPolling();
        emit("success", {
          token: result.token,
          expiresIn: result.expiresIn,
          user: result.user
        });
      }
    } catch {
      // 网络抖动时继续轮询
    }
  }, 1500);
}

async function renderQr(content: string) {
  qrDataUrl.value = await QRCode.toDataURL(content, {
    width: 220,
    margin: 1,
    color: {
      dark: "#111827",
      light: "#ffffff"
    }
  });
}

async function loadQr() {
  if (loadingQr.value) {
    return;
  }
  loadingQr.value = true;
  stopPolling();
  status.value = "WAITING";
  expireIn.value = 0;
  qrDataUrl.value = "";
  try {
    const info = await fetchWeChatQrCode();
    qrInfo.value = info;
    expireIn.value = info.expireIn;
    await renderQr(info.qrContent);
    startPolling();
  } catch (error) {
    const message = error instanceof Error ? error.message : "获取登录二维码失败";
    ElMessage.error(message);
  } finally {
    loadingQr.value = false;
  }
}

function refresh() {
  void loadQr();
}

async function onMockLogin() {
  const ticket = qrInfo.value?.ticket;
  if (!ticket || mockLoading.value) {
    return;
  }
  mockLoading.value = true;
  status.value = "SCANNED";
  try {
    const result = await mockWeChatLogin(ticket);
    stopPolling();
    status.value = "CONFIRMED";
    emit("success", result);
  } catch (error) {
    status.value = "WAITING";
    const message = error instanceof Error ? error.message : "模拟扫码失败";
    ElMessage.error(message);
  } finally {
    mockLoading.value = false;
  }
}

onMounted(() => {
  void loadQr();
});

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<style scoped>
.wechat-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 280px;
}

.wechat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 18px;
}

.wechat-logo {
  display: inline-flex;
}

.qr-box {
  width: 220px;
  height: 220px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.qr-img-wrap {
  position: relative;
  width: 204px;
  height: 204px;
}

.qr-img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 6px;
}

.qr-mask {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #07c160;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
}

.qr-mask.expired {
  color: #64748b;
  cursor: pointer;
}

.qr-placeholder {
  color: #94a3b8;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-tip {
  margin: 14px 0 0;
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  min-height: 20px;
}

.mock-btn {
  margin-top: 12px;
  width: 100%;
  border-radius: 999px;
}
</style>
