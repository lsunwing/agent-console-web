import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { CircleCheckFilled, Loading, Refresh } from "@element-plus/icons-vue";
import QRCode from "qrcode";
import { fetchWeChatQrCode, fetchWeChatStatus, mockWeChatLogin } from "../api/wechat";
const emit = defineEmits();
const qrInfo = ref(null);
const qrDataUrl = ref("");
const status = ref("WAITING");
const expireIn = ref(0);
const mockLoading = ref(false);
const loadingQr = ref(false);
let pollTimer = null;
const mockEnabled = computed(() => Boolean(qrInfo.value?.mockEnabled));
const isExpired = computed(() => status.value === "EXPIRED" || status.value === "INVALID" || expireIn.value <= 0);
const tipText = computed(() => {
    if (status.value === "SCANNED") {
        return "已扫描，请在微信中确认登录";
    }
    if (isExpired.value) {
        return "二维码已过期，点击刷新";
    }
    return "打开微信「扫一扫」登录";
});
function stopPolling() {
    if (pollTimer !== null) {
        window.clearInterval(pollTimer);
        pollTimer = null;
    }
}
function startPolling() {
    stopPolling();
    pollTimer = window.setInterval(async () => {
        const ticket = qrInfo.value?.ticket;
        if (!ticket || isExpired.value) {
            return;
        }
        try {
            const result = await fetchWeChatStatus(ticket);
            status.value = result.status;
            expireIn.value = result.expiresIn ?? 0;
            if (result.status === "CONFIRMED" && result.token && result.user) {
                stopPolling();
                emit("success", {
                    token: result.token,
                    expiresIn: result.expiresIn,
                    user: result.user
                });
            }
        }
        catch {
            // 网络抖动时继续轮询
        }
    }, 1500);
}
async function renderQr(content) {
    qrDataUrl.value = await QRCode.toDataURL(content, {
        width: 220,
        margin: 1,
        color: {
            dark: "#111827",
            light: "#ffffff"
        }
    });
}
async function loadQr() {
    if (loadingQr.value) {
        return;
    }
    loadingQr.value = true;
    stopPolling();
    status.value = "WAITING";
    expireIn.value = 0;
    qrDataUrl.value = "";
    try {
        const info = await fetchWeChatQrCode();
        qrInfo.value = info;
        expireIn.value = info.expireIn;
        await renderQr(info.qrContent);
        startPolling();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "获取登录二维码失败";
        ElMessage.error(message);
    }
    finally {
        loadingQr.value = false;
    }
}
function refresh() {
    void loadQr();
}
async function onMockLogin() {
    const ticket = qrInfo.value?.ticket;
    if (!ticket || mockLoading.value) {
        return;
    }
    mockLoading.value = true;
    status.value = "SCANNED";
    try {
        const result = await mockWeChatLogin(ticket);
        stopPolling();
        status.value = "CONFIRMED";
        emit("success", result);
    }
    catch (error) {
        status.value = "WAITING";
        const message = error instanceof Error ? error.message : "模拟扫码失败";
        ElMessage.error(message);
    }
    finally {
        mockLoading.value = false;
    }
}
onMounted(() => {
    void loadQr();
});
onBeforeUnmount(() => {
    stopPolling();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['qr-mask']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wechat-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wechat-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "wechat-logo" },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#07c160",
    d: "M9.5 4C5.36 4 2 6.91 2 10.5c0 2.05 1.12 3.88 2.88 5.08l-.72 2.16 2.5-1.25c.86.24 1.78.37 2.74.37.3 0 .6-.02.9-.05A5.3 5.3 0 0 1 9.5 15c-3.31 0-6-2.46-6-5.5S6.19 4 9.5 4zm-2.2 3.2a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9zm4.4 0a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#07c160",
    d: "M15.2 9.2c-3.04 0-5.5 2.24-5.5 5s2.46 5 5.5 5c.66 0 1.3-.1 1.9-.28l2.2 1.1-.6-1.8c1.55-1 2.5-2.5 2.5-4.02 0-2.76-2.46-5-5.5-5zm-1.9 3.1a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm3.8 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "qr-box" },
});
if (__VLS_ctx.qrDataUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "qr-img-wrap" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.qrDataUrl),
        alt: "微信登录二维码",
        ...{ class: "qr-img" },
    });
    if (__VLS_ctx.status === 'SCANNED') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "qr-mask" },
        });
        const __VLS_0 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            size: (28),
        }));
        const __VLS_2 = __VLS_1({
            size: (28),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_3.slots.default;
        const __VLS_4 = {}.CircleCheckFilled;
        /** @type {[typeof __VLS_components.CircleCheckFilled, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
        const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
        var __VLS_3;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    if (__VLS_ctx.isExpired) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.refresh) },
            ...{ class: "qr-mask expired" },
        });
        const __VLS_8 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            size: (28),
        }));
        const __VLS_10 = __VLS_9({
            size: (28),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_11.slots.default;
        const __VLS_12 = {}.Refresh;
        /** @type {[typeof __VLS_components.Refresh, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        var __VLS_11;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "qr-placeholder" },
    });
    const __VLS_16 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        size: (28),
    }));
    const __VLS_18 = __VLS_17({
        size: (28),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.Loading;
    /** @type {[typeof __VLS_components.Loading, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "qr-tip" },
});
(__VLS_ctx.tipText);
if (__VLS_ctx.mockEnabled) {
    const __VLS_24 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        ...{ class: "mock-btn" },
        plain: true,
        type: "success",
        loading: (__VLS_ctx.mockLoading),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        ...{ class: "mock-btn" },
        plain: true,
        type: "success",
        loading: (__VLS_ctx.mockLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (__VLS_ctx.onMockLogin)
    };
    __VLS_27.slots.default;
    var __VLS_27;
}
/** @type {__VLS_StyleScopedClasses['wechat-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['wechat-title']} */ ;
/** @type {__VLS_StyleScopedClasses['wechat-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-box']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-img-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-img']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['expired']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['qr-tip']} */ ;
/** @type {__VLS_StyleScopedClasses['mock-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CircleCheckFilled: CircleCheckFilled,
            Loading: Loading,
            Refresh: Refresh,
            qrDataUrl: qrDataUrl,
            status: status,
            mockLoading: mockLoading,
            mockEnabled: mockEnabled,
            isExpired: isExpired,
            tipText: tipText,
            refresh: refresh,
            onMockLogin: onMockLogin,
        };
    },
    __typeEmits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
});
; /* PartiallyEnd: #4569/main.vue */
