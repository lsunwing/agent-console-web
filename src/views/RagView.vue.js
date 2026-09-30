import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { uploadDocument, listDocuments, getDocument, deleteDocument, reindexDocument, searchChunks, } from "../api/rag";
const documents = ref([]);
const loading = ref(false);
const uploading = ref(false);
const searching = ref(false);
const searchQuery = ref("");
const searchResults = ref([]);
const detailVisible = ref(false);
const detailDoc = ref(null);
function formatSize(bytes) {
    if (bytes < 1024)
        return bytes + " B";
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
}
async function loadDocuments() {
    loading.value = true;
    try {
        documents.value = await listDocuments();
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
    finally {
        loading.value = false;
    }
}
async function handleUpload(file) {
    uploading.value = true;
    try {
        await uploadDocument(file);
        ElMessage.success("上传成功: " + file.name);
        await loadDocuments();
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
    finally {
        uploading.value = false;
    }
    return false;
}
async function handleSearch() {
    if (!searchQuery.value.trim()) {
        searchResults.value = [];
        return;
    }
    searching.value = true;
    try {
        searchResults.value = await searchChunks(searchQuery.value.trim());
        if (searchResults.value.length === 0) {
            ElMessage.info("未找到相关内容");
        }
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
    finally {
        searching.value = false;
    }
}
async function handleRowClick(row) {
    try {
        detailDoc.value = await getDocument(row.id);
        detailVisible.value = true;
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
}
async function handleReindex(row) {
    try {
        await reindexDocument(row.id);
        ElMessage.success("重建索引完成");
        await loadDocuments();
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
}
async function handleDelete(row) {
    try {
        await deleteDocument(row.id);
        ElMessage.success("已删除");
        await loadDocuments();
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ElMessage.error(msg);
    }
}
onMounted(loadDocuments);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['search-result-item']} */ ;
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-actions" },
    });
    const __VLS_5 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ 'onKeyup': {} },
        modelValue: (__VLS_ctx.searchQuery),
        placeholder: "搜索知识库...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onKeyup': {} },
        modelValue: (__VLS_ctx.searchQuery),
        placeholder: "搜索知识库...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_9;
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = {
        onKeyup: (__VLS_ctx.handleSearch)
    };
    __VLS_8.slots.default;
    {
        const { append: __VLS_thisSlot } = __VLS_8.slots;
        const __VLS_13 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            ...{ 'onClick': {} },
            loading: (__VLS_ctx.searching),
        }));
        const __VLS_15 = __VLS_14({
            ...{ 'onClick': {} },
            loading: (__VLS_ctx.searching),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        let __VLS_17;
        let __VLS_18;
        let __VLS_19;
        const __VLS_20 = {
            onClick: (__VLS_ctx.handleSearch)
        };
        __VLS_16.slots.default;
        var __VLS_16;
    }
    var __VLS_8;
    const __VLS_21 = {}.ElUpload;
    /** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        showFileList: (false),
        beforeUpload: (__VLS_ctx.handleUpload),
        accept: ".md,.txt,.log,.csv,.json,.docx,.xlsx,.pdf,.pptx",
    }));
    const __VLS_23 = __VLS_22({
        showFileList: (false),
        beforeUpload: (__VLS_ctx.handleUpload),
        accept: ".md,.txt,.log,.csv,.json,.docx,.xlsx,.pdf,.pptx",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    const __VLS_25 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.uploading),
    }));
    const __VLS_27 = __VLS_26({
        type: "primary",
        size: "small",
        loading: (__VLS_ctx.uploading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    var __VLS_28;
    var __VLS_24;
}
const __VLS_29 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    gutter: (16),
}));
const __VLS_31 = __VLS_30({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    span: (__VLS_ctx.searchResults.length ? 14 : 24),
}));
const __VLS_35 = __VLS_34({
    span: (__VLS_ctx.searchResults.length ? 14 : 24),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
const __VLS_37 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onRowClick': {} },
    data: (__VLS_ctx.documents),
    border: true,
    size: "small",
    ...{ style: {} },
    emptyText: "暂无知识库文档，可上传 Word / Excel / PDF / PPT / Markdown / 日志",
    highlightCurrentRow: true,
}));
const __VLS_39 = __VLS_38({
    ...{ 'onRowClick': {} },
    data: (__VLS_ctx.documents),
    border: true,
    size: "small",
    ...{ style: {} },
    emptyText: "暂无知识库文档，可上传 Word / Excel / PDF / PPT / Markdown / 日志",
    highlightCurrentRow: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onRowClick: (__VLS_ctx.handleRowClick)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_40.slots.default;
const __VLS_45 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    prop: "fileName",
    label: "文件名",
    minWidth: "200",
}));
const __VLS_47 = __VLS_46({
    prop: "fileName",
    label: "文件名",
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_49 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    prop: "fileType",
    label: "类型",
    width: "80",
}));
const __VLS_51 = __VLS_50({
    prop: "fileType",
    label: "类型",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_52.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_53 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        size: "small",
    }));
    const __VLS_55 = __VLS_54({
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    (row.fileType);
    var __VLS_56;
}
var __VLS_52;
const __VLS_57 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    prop: "chunkCount",
    label: "Chunks",
    width: "90",
    align: "center",
}));
const __VLS_59 = __VLS_58({
    prop: "chunkCount",
    label: "Chunks",
    width: "90",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const __VLS_61 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    label: "大小",
    width: "90",
    align: "center",
}));
const __VLS_63 = __VLS_62({
    label: "大小",
    width: "90",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_64.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatSize(row.fileSize));
}
var __VLS_64;
const __VLS_65 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    prop: "createdAt",
    label: "上传时间",
    width: "170",
}));
const __VLS_67 = __VLS_66({
    prop: "createdAt",
    label: "上传时间",
    width: "170",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const __VLS_69 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    label: "操作",
    width: "160",
    align: "center",
}));
const __VLS_71 = __VLS_70({
    label: "操作",
    width: "160",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_72.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_73 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
        link: true,
    }));
    const __VLS_75 = __VLS_74({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    let __VLS_77;
    let __VLS_78;
    let __VLS_79;
    const __VLS_80 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleReindex(row);
        }
    };
    __VLS_76.slots.default;
    var __VLS_76;
    const __VLS_81 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ 'onConfirm': {} },
        title: "确认删除此文档及所有 chunks？",
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onConfirm': {} },
        title: "确认删除此文档及所有 chunks？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_85;
    let __VLS_86;
    let __VLS_87;
    const __VLS_88 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.handleDelete(row);
        }
    };
    __VLS_84.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_84.slots;
        const __VLS_89 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            link: true,
        }));
        const __VLS_91 = __VLS_90({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            link: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_90));
        let __VLS_93;
        let __VLS_94;
        let __VLS_95;
        const __VLS_96 = {
            onClick: () => { }
        };
        __VLS_92.slots.default;
        var __VLS_92;
    }
    var __VLS_84;
}
var __VLS_72;
var __VLS_40;
var __VLS_36;
if (__VLS_ctx.searchResults.length) {
    const __VLS_97 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        span: (10),
    }));
    const __VLS_99 = __VLS_98({
        span: (10),
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    __VLS_100.slots.default;
    const __VLS_101 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        shadow: "never",
        ...{ style: {} },
    }));
    const __VLS_103 = __VLS_102({
        shadow: "never",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_104.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_104.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.searchResults.length);
    }
    for (const [chunk, index] of __VLS_getVForSourceType((__VLS_ctx.searchResults))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (chunk.id),
            ...{ class: "search-result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "search-result-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "search-result-index" },
        });
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "search-result-file" },
        });
        (chunk.filePath);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "search-result-content" },
        });
        (chunk.content);
    }
    var __VLS_104;
    var __VLS_100;
}
var __VLS_32;
const __VLS_105 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    modelValue: (__VLS_ctx.detailVisible),
    title: (__VLS_ctx.detailDoc?.document.fileName || '文档详情'),
    width: "min(1100px, 94vw)",
    top: "4vh",
    ...{ class: "rag-detail-dialog" },
    destroyOnClose: true,
}));
const __VLS_107 = __VLS_106({
    modelValue: (__VLS_ctx.detailVisible),
    title: (__VLS_ctx.detailDoc?.document.fileName || '文档详情'),
    width: "min(1100px, 94vw)",
    top: "4vh",
    ...{ class: "rag-detail-dialog" },
    destroyOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
__VLS_108.slots.default;
if (__VLS_ctx.detailDoc) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-info" },
    });
    const __VLS_109 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        column: (4),
        size: "small",
        border: true,
        ...{ class: "detail-meta" },
    }));
    const __VLS_111 = __VLS_110({
        column: (4),
        size: "small",
        border: true,
        ...{ class: "detail-meta" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    __VLS_112.slots.default;
    const __VLS_113 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        label: "文件名",
        span: (2),
    }));
    const __VLS_115 = __VLS_114({
        label: "文件名",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    __VLS_116.slots.default;
    (__VLS_ctx.detailDoc.document.fileName);
    var __VLS_116;
    const __VLS_117 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        label: "类型",
    }));
    const __VLS_119 = __VLS_118({
        label: "类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    __VLS_120.slots.default;
    (__VLS_ctx.detailDoc.document.fileType);
    var __VLS_120;
    const __VLS_121 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        label: "Chunks",
    }));
    const __VLS_123 = __VLS_122({
        label: "Chunks",
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    __VLS_124.slots.default;
    (__VLS_ctx.detailDoc.chunks.length);
    var __VLS_124;
    var __VLS_112;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "chunk-list" },
    });
    for (const [chunk] of __VLS_getVForSourceType((__VLS_ctx.detailDoc.chunks))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (chunk.id),
            ...{ class: "chunk-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chunk-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (chunk.chunkIndex);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "chunk-len" },
        });
        (chunk.content.length);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
            ...{ class: "chunk-content" },
        });
        (chunk.content);
    }
}
var __VLS_108;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['header-line']} */ ;
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-header']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-index']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-file']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-content']} */ ;
/** @type {__VLS_StyleScopedClasses['rag-detail-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-info']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['chunk-list']} */ ;
/** @type {__VLS_StyleScopedClasses['chunk-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chunk-header']} */ ;
/** @type {__VLS_StyleScopedClasses['chunk-len']} */ ;
/** @type {__VLS_StyleScopedClasses['chunk-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            documents: documents,
            loading: loading,
            uploading: uploading,
            searching: searching,
            searchQuery: searchQuery,
            searchResults: searchResults,
            detailVisible: detailVisible,
            detailDoc: detailDoc,
            formatSize: formatSize,
            handleUpload: handleUpload,
            handleSearch: handleSearch,
            handleRowClick: handleRowClick,
            handleReindex: handleReindex,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
