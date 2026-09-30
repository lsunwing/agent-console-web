import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useAgentStore } from "../stores/agent";
import TracePanel from "./TracePanel.vue";
import MarkdownContent from "./MarkdownContent.vue";
const store = useAgentStore();
const input = ref("");
const traceVisible = ref(false);
function formatTime(value) {
    return new Date(value).toLocaleString();
}
async function send() {
    const text = input.value.trim();
    if (!text) {
        return;
    }
    try {
        await store.sendMessage(text);
        input.value = "";
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
}
function onKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        send();
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['message-item']} */ ;
/** @type {__VLS_StyleScopedClasses['message-item']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    shadow: "never",
    ...{ class: "panel-card" },
}));
const __VLS_2 = __VLS_1({
    shadow: "never",
    ...{ class: "panel-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "actions" },
    });
    const __VLS_4 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClick: (__VLS_ctx.store.clearConversation)
    };
    __VLS_7.slots.default;
    var __VLS_7;
    const __VLS_12 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_16;
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = {
        onClick: (...[$event]) => {
            __VLS_ctx.traceVisible = true;
        }
    };
    __VLS_15.slots.default;
    var __VLS_15;
    const __VLS_20 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        plain: true,
        disabled: (!__VLS_ctx.store.running),
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        plain: true,
        disabled: (!__VLS_ctx.store.running),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (__VLS_ctx.store.stopStream)
    };
    __VLS_23.slots.default;
    var __VLS_23;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "message-list" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.store.messages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "message-item" },
        ...{ class: (item.role) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "meta" },
    });
    (item.role === "user" ? "用户" : "Agent");
    (__VLS_ctx.formatTime(item.time));
    if (item.role === 'agent') {
        /** @type {[typeof MarkdownContent, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(MarkdownContent, new MarkdownContent({
            content: (item.content),
            ...{ class: "content" },
        }));
        const __VLS_29 = __VLS_28({
            content: (item.content),
            ...{ class: "content" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "content plain" },
        });
        (item.content);
    }
}
if (__VLS_ctx.store.assistantBuffer) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "message-item agent" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "meta" },
    });
    /** @type {[typeof MarkdownContent, ]} */ ;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(MarkdownContent, new MarkdownContent({
        content: (__VLS_ctx.store.assistantBuffer),
        ...{ class: "content" },
    }));
    const __VLS_32 = __VLS_31({
        content: (__VLS_ctx.store.assistantBuffer),
        ...{ class: "content" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "composer" },
});
const __VLS_34 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.input),
    type: "textarea",
    rows: (3),
    placeholder: "输入消息并回车发送（Shift+Enter换行）",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.input),
    type: "textarea",
    rows: (3),
    placeholder: "输入消息并回车发送（Shift+Enter换行）",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onKeydown: (__VLS_ctx.onKeydown)
};
var __VLS_37;
const __VLS_42 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.store.running),
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.store.running),
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_46;
let __VLS_47;
let __VLS_48;
const __VLS_49 = {
    onClick: (__VLS_ctx.send)
};
__VLS_45.slots.default;
var __VLS_45;
var __VLS_3;
const __VLS_50 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.traceVisible),
    title: "Trace",
    direction: "rtl",
    size: "480px",
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.traceVisible),
    title: "Trace",
    direction: "rtl",
    size: "480px",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
/** @type {[typeof TracePanel, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(TracePanel, new TracePanel({}));
const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
var __VLS_53;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['header-line']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['message-list']} */ ;
/** @type {__VLS_StyleScopedClasses['message-item']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['plain']} */ ;
/** @type {__VLS_StyleScopedClasses['message-item']} */ ;
/** @type {__VLS_StyleScopedClasses['agent']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['composer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TracePanel: TracePanel,
            MarkdownContent: MarkdownContent,
            store: store,
            input: input,
            traceVisible: traceVisible,
            formatTime: formatTime,
            send: send,
            onKeydown: onKeydown,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
