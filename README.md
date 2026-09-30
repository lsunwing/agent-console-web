# Agent Console Web

最小版本前端控制台，严格按文档技术选型：`Vue3 + TypeScript + Vite + Element Plus`。

## 功能

- `Login`：账号密码 + 微信扫码登录，未登录拦截业务路由
- `Chat`：发送消息并调用 `/chat/stream`（SSE）
- `Trace`：实时查看 Agent 执行轨迹
- `Tools`：加载 `/tools` 工具注册列表
- `RAG`：知识库上传与检索
- 会话状态：展示 `conversationId`、`finishReason`、`token usage`
- 左下角用户卡片：显示当前登录用户，支持退出登录

## 用户管理

设计文档见 [docs/user-management-design.md](docs/user-management-design.md)。
微信扫码见 [docs/wechat-login-design.md](docs/wechat-login-design.md)。

默认种子账号：

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 管理员 |
| demo | demo123 | 普通用户 |

登录后 Token 保存在 `localStorage`（`agent_console_token`），所有 API 请求自动携带 `Authorization: Bearer <token>`。

## 启动

1. 启动后端（默认 `http://localhost:8080`）
2. 安装依赖：
   - `npm install`
3. 启动前端：
   - `npm run dev`

## 前后端分离说明

- 前端通过 Vite Dev Server 运行在 `5173`
- 已配置代理转发：`/api/*` -> `http://localhost:8080`
- 可通过环境变量覆盖后端地址：
  - `VITE_API_PROXY_TARGET=http://localhost:8080`
