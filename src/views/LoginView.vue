<template>
  <div class="login-page">
    <div class="login-shell">
      <div class="brand">
        <div class="brand-icon">
          <el-icon :size="28"><ChatDotRound /></el-icon>
        </div>
        <div class="brand-text">
          <h1>Agent Console</h1>
          <p>登录后开始使用智能体</p>
        </div>
      </div>

      <div class="login-split">
        <!-- 左侧：账号密码 -->
        <section class="pane form-pane">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            size="large"
            class="login-form"
            @submit.prevent="onSubmit"
          >
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                class="pill-input"
                placeholder="请输入用户名"
                autocomplete="username"
                clearable
                @keyup.enter="onSubmit"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                class="pill-input"
                type="password"
                placeholder="请输入密码"
                autocomplete="current-password"
                show-password
                @keyup.enter="onSubmit"
              />
            </el-form-item>

            <p class="agreement">
              登录即代表已阅读并同意我们的
              <a href="javascript:void(0)">用户协议</a>
              与
              <a href="javascript:void(0)">隐私政策</a>
            </p>

            <el-button
              class="login-btn"
              type="primary"
              size="large"
              :loading="loading"
              native-type="submit"
              @click="onSubmit"
            >
              登录
            </el-button>
          </el-form>

          <div class="login-footer">
            <span>默认账号：admin / admin123</span>
          </div>
        </section>

        <!-- 分割线 -->
        <div class="divider" aria-hidden="true">
          <span>或</span>
        </div>

        <!-- 右侧：微信扫码 -->
        <section class="pane qr-pane">
          <WeChatLoginPanel @success="onWeChatSuccess" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { ChatDotRound } from "@element-plus/icons-vue";
import { useAuthStore } from "../stores/auth";
import WeChatLoginPanel from "../components/WeChatLoginPanel.vue";
import type { LoginResponse } from "../types/auth";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: "",
  password: ""
});

const rules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};

function resolveRedirect(): string {
  const redirect = route.query.redirect;
  if (typeof redirect === "string" && redirect.startsWith("/") && !redirect.startsWith("//")) {
    return redirect;
  }
  return "/chat";
}

async function enterApp() {
  await router.replace(resolveRedirect());
}

async function onSubmit() {
  if (!formRef.value || loading.value) {
    return;
  }
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    await auth.login(form.username.trim(), form.password);
    ElMessage.success("登录成功");
    await enterApp();
  } catch (error) {
    const message = error instanceof Error ? error.message : "登录失败";
    ElMessage.error(message);
  } finally {
    loading.value = false;
  }
}

function onWeChatSuccess(result: LoginResponse) {
  auth.applyLoginResult(result);
  ElMessage.success("微信登录成功");
  void enterApp();
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 12% 18%, rgba(99, 102, 241, 0.12), transparent 30%),
    radial-gradient(circle at 88% 78%, rgba(7, 193, 96, 0.1), transparent 28%),
    #f5f6f8;
  padding: 24px;
}

.login-shell {
  width: min(920px, 100%);
  background: #ffffff;
  border: 1px solid #e8eaef;
  border-radius: 24px;
  padding: 40px 48px 36px;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.08);
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.brand-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  text-align: center;
}

.brand-text h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.brand-text p {
  margin: 6px 0 0;
  font-size: 14px;
  color: #6b7280;
}

.login-split {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 36px;
  align-items: stretch;
  max-width: 820px;
  margin: 0 auto;
}

.pane {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-pane {
  padding: 8px 8px 0 12px;
}

.qr-pane {
  background: #f7f8fa;
  border-radius: 20px;
  padding: 28px 24px;
  align-items: center;
  justify-content: center;
}

.divider {
  width: 1px;
  background: linear-gradient(180deg, transparent, #e5e7eb 15%, #e5e7eb 85%, transparent);
  position: relative;
}

.divider span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #c0c4cc;
  font-size: 12px;
  padding: 8px 0;
  line-height: 1;
}

.login-form {
  width: 100%;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 18px;
}

.pill-input :deep(.el-input__wrapper) {
  border-radius: 999px;
  padding: 4px 18px;
  min-height: 48px;
  box-shadow: 0 0 0 1px #e5e7eb inset;
}

.pill-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1.5px #6366f1 inset;
}

.agreement {
  margin: 4px 0 18px;
  font-size: 12px;
  line-height: 1.6;
  color: #9ca3af;
}

.agreement a {
  color: #4b5563;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  background: #6366f1;
  border-color: #6366f1;
}

.login-btn:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}

.login-footer {
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
}

@media (max-width: 820px) {
  .login-shell {
    padding: 28px 20px 24px;
  }

  .login-split {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: #e5e7eb;
  }

  .divider span {
    padding: 0 10px;
    background: #fff;
  }

  .form-pane {
    padding: 0;
  }
}
</style>
