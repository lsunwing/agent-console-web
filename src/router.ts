import { createRouter, createWebHistory } from "vue-router";
import ChatView from "./views/ChatView.vue";
import LoginView from "./views/LoginView.vue";
import McpView from "./views/McpView.vue";
import RagView from "./views/RagView.vue";
import TraceView from "./views/TraceView.vue";
import ToolsView from "./views/ToolsView.vue";
import { useAuthStore } from "./stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/chat" },
    { path: "/login", name: "login", component: LoginView, meta: { title: "登录", public: true } },
    { path: "/chat", name: "chat", component: ChatView, meta: { title: "智能问答" } },
    { path: "/rag", name: "rag", component: RagView, meta: { title: "RAG知识库" } },
    { path: "/mcp", name: "mcp", component: McpView, meta: { title: "MCP Server" } },
    { path: "/tools", name: "tools", component: ToolsView, meta: { title: "Tool管理" } },
    { path: "/trace", name: "trace", component: TraceView, meta: { title: "Trace" } }
  ]
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.bootstrap();

  if (to.meta.public) {
    if (to.path === "/login" && auth.isLoggedIn) {
      return (to.query.redirect as string) || "/chat";
    }
    return true;
  }

  if (!auth.isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath }
    };
  }

  return true;
});

export default router;
