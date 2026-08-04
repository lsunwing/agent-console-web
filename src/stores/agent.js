import { defineStore } from "pinia";
import { ref } from "vue";
import { streamChat } from "../api/chat";
function now() {
    return new Date().toISOString();
}
function stringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    }
    catch {
        return String(value);
    }
}
export const useAgentStore = defineStore("agent", () => {
    const conversationId = ref("");
    const running = ref(false);
    const assistantBuffer = ref("");
    const finishReason = ref("");
    const usage = ref({});
    const messages = ref([]);
    const traces = ref([]);
    const reasoningTimeline = ref([]);
    const tools = ref([]);
    const calledToolNames = ref([]);
    let controller = null;
    function pushTrace(type, detail, timestamp) {
        traces.value.unshift({
            type,
            detail,
            timestamp: timestamp || now()
        });
    }
    function pushTimeline(message, stage = "UNKNOWN", iteration, timestamp) {
        reasoningTimeline.value.unshift({
            message,
            stage,
            iteration,
            timestamp: timestamp || now()
        });
    }
    function pushMessage(role, content) {
        messages.value.push({ role, content, time: now() });
    }
    function clearConversation() {
        conversationId.value = "";
        assistantBuffer.value = "";
        finishReason.value = "";
        usage.value = {};
        messages.value = [];
        traces.value = [];
        reasoningTimeline.value = [];
        calledToolNames.value = [];
    }
    function stopStream() {
        controller?.abort();
        controller = null;
        running.value = false;
    }
    function applyEvent(event) {
        const eventType = event.type || "UnknownEvent";
        const ts = event.timestamp || now();
        if (event.conversationId) {
            conversationId.value = event.conversationId;
        }
        if (eventType === "ReasoningTimelineEvent") {
            pushTimeline(event.message || "状态更新", event.stage || "UNKNOWN", event.iteration, ts);
            return;
        }
        if (eventType === "AgentTokenEvent") {
            assistantBuffer.value += event.token || "";
            return;
        }
        if (eventType === "ToolStartedEvent") {
            const name = event.toolCall?.name;
            if (name && !calledToolNames.value.includes(name)) {
                calledToolNames.value.push(name);
            }
            pushTrace("Tool Call", stringify(event.toolCall || {}), ts);
            return;
        }
        if (eventType === "ToolCompletedEvent") {
            pushTrace("Tool Result", stringify(event.result || {}), ts);
            return;
        }
        if (eventType === "AgentCompletedEvent") {
            const response = event.response || {};
            const content = response.content || assistantBuffer.value || "(empty)";
            if (response.conversationId) {
                conversationId.value = response.conversationId;
            }
            finishReason.value = response.finishReason || "";
            usage.value = response.usage || {};
            pushMessage("agent", content);
            pushTrace("Agent Completed", stringify(response), ts);
            assistantBuffer.value = "";
            return;
        }
        pushTrace(eventType, stringify(event), ts);
    }
    async function sendMessage(message) {
        if (!message.trim() || running.value) {
            return;
        }
        stopStream();
        running.value = true;
        assistantBuffer.value = "";
        pushMessage("user", message);
        controller = new AbortController();
        try {
            await streamChat({
                message,
                conversationId: conversationId.value || undefined
            }, {
                signal: controller.signal,
                onEvent: applyEvent
            });
        }
        finally {
            running.value = false;
            controller = null;
        }
    }
    function setTools(values) {
        tools.value = values;
    }
    return {
        conversationId,
        running,
        assistantBuffer,
        finishReason,
        usage,
        messages,
        traces,
        reasoningTimeline,
        tools,
        calledToolNames,
        sendMessage,
        stopStream,
        clearConversation,
        setTools
    };
});
