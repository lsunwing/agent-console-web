import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { fetchMcpServers } from "../api/mcp";
const servers = ref([]);
const selectedServer = ref(null);
const loading = ref(false);
function stringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    }
    catch {
        return String(value);
    }
}
function selectServer(server) {
    selectedServer.value = server;
}
async function loadServers() {
    loading.value = true;
    try {
        servers.value = await fetchMcpServers();
        if (selectedServer.value) {
            const found = servers.value.find((s) => s.name === selectedServer.value.name);
            selectedServer.value = found || servers.value[0] || null;
        }
        else if (servers.value.length) {
            selectedServer.value = servers.value[0];
        }
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
    finally {
        loading.value = false;
    }
}
onMounted(loadServers);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['server-item']} */ ;
/** @type {__VLS_StyleScopedClasses['server-item']} */ ;
/** @type {__VLS_StyleScopedClasses['server-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
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
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_5 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        size: "small",
        loading: (__VLS_ctx.loading),
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        size: "small",
        loading: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_9;
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = {
        onClick: (__VLS_ctx.loadServers)
    };
    __VLS_8.slots.default;
    var __VLS_8;
}
const __VLS_13 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    gutter: (16),
}));
const __VLS_15 = __VLS_14({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_16.slots.default;
const __VLS_17 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    span: (6),
}));
const __VLS_19 = __VLS_18({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "server-list" },
});
if (!__VLS_ctx.servers.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "muted" },
        ...{ style: {} },
    });
}
for (const [server] of __VLS_getVForSourceType((__VLS_ctx.servers))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectServer(server);
            } },
        key: (server.name),
        ...{ class: "server-item" },
        ...{ class: ({ active: __VLS_ctx.selectedServer?.name === server.name }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "server-name" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
        ...{ class: "status-dot" },
        ...{ class: (server.processAlive ? 'alive' : 'dead') },
    });
    (server.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "server-meta" },
    });
    if (server.enabled) {
        const __VLS_21 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            size: "small",
            type: "success",
        }));
        const __VLS_23 = __VLS_22({
            size: "small",
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        __VLS_24.slots.default;
        var __VLS_24;
    }
    else {
        const __VLS_25 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            size: "small",
            type: "info",
        }));
        const __VLS_27 = __VLS_26({
            size: "small",
            type: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_28.slots.default;
        var __VLS_28;
    }
    if (server.initialized) {
        const __VLS_29 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            size: "small",
            type: "primary",
        }));
        const __VLS_31 = __VLS_30({
            size: "small",
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        __VLS_32.slots.default;
        var __VLS_32;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "muted tool-count" },
    });
    (server.tools.length);
}
var __VLS_20;
const __VLS_33 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    span: (18),
}));
const __VLS_35 = __VLS_34({
    span: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
if (!__VLS_ctx.selectedServer) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "muted" },
        ...{ style: {} },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_37 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        column: (2),
        size: "small",
        border: true,
        ...{ style: {} },
    }));
    const __VLS_39 = __VLS_38({
        column: (2),
        size: "small",
        border: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    const __VLS_41 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        label: "服务器名称",
    }));
    const __VLS_43 = __VLS_42({
        label: "服务器名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    __VLS_44.slots.default;
    (__VLS_ctx.selectedServer.name);
    var __VLS_44;
    const __VLS_45 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        label: "进程状态",
    }));
    const __VLS_47 = __VLS_46({
        label: "进程状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        type: (__VLS_ctx.selectedServer.processAlive ? 'success' : 'danger'),
        size: "small",
    }));
    const __VLS_51 = __VLS_50({
        type: (__VLS_ctx.selectedServer.processAlive ? 'success' : 'danger'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    (__VLS_ctx.selectedServer.processAlive ? '运行中' : '已停止');
    var __VLS_52;
    var __VLS_48;
    const __VLS_53 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        label: "命令",
    }));
    const __VLS_55 = __VLS_54({
        label: "命令",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    (__VLS_ctx.selectedServer.command);
    var __VLS_56;
    const __VLS_57 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        label: "参数",
    }));
    const __VLS_59 = __VLS_58({
        label: "参数",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_60.slots.default;
    (__VLS_ctx.selectedServer.args.join(" ") || "-");
    var __VLS_60;
    if (__VLS_ctx.selectedServer.lastError) {
        const __VLS_61 = {}.ElDescriptionsItem;
        /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
            label: "最近错误",
            span: (2),
        }));
        const __VLS_63 = __VLS_62({
            label: "最近错误",
            span: (2),
        }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        __VLS_64.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ style: {} },
        });
        (__VLS_ctx.selectedServer.lastError);
        var __VLS_64;
    }
    var __VLS_40;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ style: {} },
    });
    (__VLS_ctx.selectedServer.tools.length);
    const __VLS_65 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        data: (__VLS_ctx.selectedServer.tools),
        border: true,
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_67 = __VLS_66({
        data: (__VLS_ctx.selectedServer.tools),
        border: true,
        size: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_68.slots.default;
    const __VLS_69 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        prop: "name",
        label: "Name",
        minWidth: "150",
    }));
    const __VLS_71 = __VLS_70({
        prop: "name",
        label: "Name",
        minWidth: "150",
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    const __VLS_73 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        prop: "description",
        label: "Description",
        minWidth: "250",
    }));
    const __VLS_75 = __VLS_74({
        prop: "description",
        label: "Description",
        minWidth: "250",
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    const __VLS_77 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
        label: "Input Schema",
        minWidth: "280",
    }));
    const __VLS_79 = __VLS_78({
        label: "Input Schema",
        minWidth: "280",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    __VLS_80.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_80.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
            ...{ class: "trace-detail" },
        });
        (__VLS_ctx.stringify(scope.row.inputSchema || {}));
    }
    var __VLS_80;
    var __VLS_68;
}
var __VLS_36;
var __VLS_16;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['header-line']} */ ;
/** @type {__VLS_StyleScopedClasses['server-list']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['server-item']} */ ;
/** @type {__VLS_StyleScopedClasses['server-name']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['server-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-count']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-detail']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            servers: servers,
            selectedServer: selectedServer,
            loading: loading,
            stringify: stringify,
            selectServer: selectServer,
            loadServers: loadServers,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
