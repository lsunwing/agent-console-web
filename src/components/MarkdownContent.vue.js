import { computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";
marked.setOptions({
    gfm: true,
    breaks: true
});
const props = defineProps();
const html = computed(() => {
    const raw = props.content ?? "";
    if (!raw.trim()) {
        return "";
    }
    try {
        const rendered = marked.parse(raw, { async: false });
        return DOMPurify.sanitize(rendered, {
            USE_PROFILES: { html: true },
            ADD_ATTR: ["target", "rel"]
        });
    }
    catch {
        return DOMPurify.sanitize(escapeHtml(raw));
    }
});
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "md-body" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.html) }, null, null);
/** @type {__VLS_StyleScopedClasses['md-body']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            html: html,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
