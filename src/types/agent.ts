export interface ChatRequest {
  conversationId?: string;
  message: string;
  context?: Record<string, unknown>;
}

export interface Usage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface ToolCall {
  id?: string;
  name: string;
  arguments?: Record<string, unknown>;
}

export interface ChatResponse {
  conversationId?: string;
  content?: string;
  finishReason?: string;
  toolCalls?: ToolCall[];
  usage?: Usage;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
}

export interface AgentEvent {
  type?: string;
  conversationId?: string;
  timestamp?: string;
  iteration?: number;
  token?: string;
  stage?: string;
  message?: string;
  toolCall?: ToolCall;
  result?: {
    toolName?: string;
    output?: unknown;
  };
  response?: ChatResponse;
}

export interface TraceItem {
  type: string;
  detail: string;
  timestamp: string;
}

export interface TimelineItem {
  stage: string;
  message: string;
  iteration?: number;
  timestamp: string;
}

export interface ChatMessage {
  role: "user" | "agent";
  content: string;
  time: string;
}
