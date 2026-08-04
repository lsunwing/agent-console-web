import { createRouter, createWebHistory } from "vue-router";
import ChatView from "./views/ChatView.vue";
import TraceView from "./views/TraceView.vue";
import ToolsView from "./views/ToolsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/chat" },
    { path: "/chat", name: "chat", component: ChatView },
    { path: "/trace", name: "trace", component: TraceView },
    { path: "/tools", name: "tools", component: ToolsView }
  ]
});

export default router;

