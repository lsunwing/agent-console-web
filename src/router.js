import { createRouter, createWebHistory } from "vue-router";
import ChatView from "./views/ChatView.vue";
import McpView from "./views/McpView.vue";
import RagView from "./views/RagView.vue";
import TraceView from "./views/TraceView.vue";
import ToolsView from "./views/ToolsView.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/chat" },
        { path: "/chat", name: "chat", component: ChatView, meta: { title: "智能问答" } },
        { path: "/rag", name: "rag", component: RagView, meta: { title: "RAG知识库" } },
        { path: "/mcp", name: "mcp", component: McpView, meta: { title: "MCP Server" } },
        { path: "/tools", name: "tools", component: ToolsView, meta: { title: "Tool管理" } },
        { path: "/trace", name: "trace", component: TraceView, meta: { title: "Trace" } }
    ]
});
export default router;
