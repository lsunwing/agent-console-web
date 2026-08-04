# Agent Console Web

最小版本前端控制台，严格按文档技术选型：`Vue3 + TypeScript + Vite + Element Plus`。

## 功能

- `Chat`：发送消息并调用 `/chat/stream`（SSE）
- `Trace`：实时查看 Agent 执行轨迹
- `Tools`：加载 `/tools` 工具注册列表
- 会话状态：展示 `conversationId`、`finishReason`、`token usage`

## 启动

1. 启动后端（默认 `http://localhost:8080`）
2. 安装依赖：
   - `npm install`
3. 启动前端：
   - `npm run dev`

## 前后端分离说明

- 前端通过 Vite Dev Server 运行在 `5173`
- 已配置代理转发：`/chat`、`/tools` -> `http://localhost:8080`
- 可通过环境变量覆盖后端地址：
  - `VITE_API_PROXY_TARGET=http://localhost:8080`
