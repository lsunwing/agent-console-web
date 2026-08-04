import { useAgentStore } from "../stores/agent";
const store = useAgentStore();
function formatTime(value) {
    return new Date(value).toLocaleString();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (__VLS_ctx.store.reasoningTimeline.length) {
    const __VLS_5 = {}.ElTimeline;
    /** @type {[typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ class: "timeline-main" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "timeline-main" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.store.reasoningTimeline))) {
        const __VLS_9 = {}.ElTimelineItem;
        /** @type {[typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
            key: (`timeline-${index}`),
            timestamp: (__VLS_ctx.formatTime(item.timestamp)),
            placement: "top",
        }));
        const __VLS_11 = __VLS_10({
            key: (`timeline-${index}`),
            timestamp: (__VLS_ctx.formatTime(item.timestamp)),
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        __VLS_12.slots.default;
        const __VLS_13 = {}.ElCard;
        /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            shadow: "hover",
            ...{ class: "timeline-card" },
        }));
        const __VLS_15 = __VLS_14({
            shadow: "hover",
            ...{ class: "timeline-card" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        __VLS_16.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "timeline-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (item.message);
        const __VLS_17 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            size: "small",
            effect: "plain",
        }));
        const __VLS_19 = __VLS_18({
            size: "small",
            effect: "plain",
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        __VLS_20.slots.default;
        (item.stage);
        var __VLS_20;
        if (item.iteration !== undefined) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "meta" },
            });
            (item.iteration);
        }
        var __VLS_16;
        var __VLS_12;
    }
    var __VLS_8;
}
else {
    const __VLS_21 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        description: "暂无推理时间线",
    }));
    const __VLS_23 = __VLS_22({
        description: "暂无推理时间线",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
}
const __VLS_25 = {}.ElDivider;
/** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
var __VLS_28;
const __VLS_29 = {}.ElCollapse;
/** @type {[typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.ElCollapseItem;
/** @type {[typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    title: (`技术事件（${__VLS_ctx.store.traces.length}）`),
    name: "tech",
}));
const __VLS_35 = __VLS_34({
    title: (`技术事件（${__VLS_ctx.store.traces.length}）`),
    name: "tech",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
if (__VLS_ctx.store.traces.length) {
    const __VLS_37 = {}.ElTimeline;
    /** @type {[typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
    const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.store.traces))) {
        const __VLS_41 = {}.ElTimelineItem;
        /** @type {[typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, ]} */ ;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
            key: (`trace-${index}`),
            timestamp: (__VLS_ctx.formatTime(item.timestamp)),
            placement: "top",
        }));
        const __VLS_43 = __VLS_42({
            key: (`trace-${index}`),
            timestamp: (__VLS_ctx.formatTime(item.timestamp)),
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        __VLS_44.slots.default;
        const __VLS_45 = {}.ElCard;
        /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            shadow: "hover",
        }));
        const __VLS_47 = __VLS_46({
            shadow: "hover",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        __VLS_48.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (item.type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
            ...{ class: "trace-detail" },
        });
        (item.detail);
        var __VLS_48;
        var __VLS_44;
    }
    var __VLS_40;
}
else {
    const __VLS_49 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        description: "暂无技术事件",
    }));
    const __VLS_51 = __VLS_50({
        description: "暂无技术事件",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
}
var __VLS_36;
var __VLS_32;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline-main']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline-card']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline-header']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-detail']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            formatTime: formatTime,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
