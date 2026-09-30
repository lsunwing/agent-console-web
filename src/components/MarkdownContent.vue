<template>
  <div class="md-body" v-html="html"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: true
});

const props = defineProps<{
  content: string;
}>();

const html = computed(() => {
  const raw = props.content ?? "";
  if (!raw.trim()) {
    return "";
  }
  try {
    const rendered = marked.parse(raw, { async: false }) as string;
    return DOMPurify.sanitize(rendered, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"]
    });
  } catch {
    return DOMPurify.sanitize(escapeHtml(raw));
  }
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
</script>

<style scoped>
.md-body {
  font-size: 14px;
  line-height: 1.65;
  color: #1f2937;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.md-body :deep(p) {
  margin: 0 0 10px;
}

.md-body :deep(p:last-child) {
  margin-bottom: 0;
}

.md-body :deep(h1),
.md-body :deep(h2),
.md-body :deep(h3),
.md-body :deep(h4),
.md-body :deep(h5),
.md-body :deep(h6) {
  margin: 14px 0 8px;
  line-height: 1.35;
  color: #0f172a;
  font-weight: 650;
}

.md-body :deep(h1) {
  font-size: 1.25em;
}
.md-body :deep(h2) {
  font-size: 1.15em;
}
.md-body :deep(h3) {
  font-size: 1.05em;
}

.md-body :deep(ul),
.md-body :deep(ol) {
  margin: 0 0 10px;
  padding-left: 1.35em;
}

.md-body :deep(li) {
  margin: 3px 0;
}

.md-body :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.92em;
  background: #f1f5f9;
  border-radius: 4px;
  padding: 1px 5px;
}

.md-body :deep(pre) {
  margin: 0 0 12px;
  padding: 12px 14px;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
}

.md-body :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  font-size: 12.5px;
  line-height: 1.55;
}

.md-body :deep(blockquote) {
  margin: 0 0 10px;
  padding: 6px 12px;
  border-left: 3px solid #93c5fd;
  background: #f8fafc;
  color: #475569;
}

.md-body :deep(table) {
  border-collapse: collapse;
  margin: 0 0 12px;
  width: 100%;
  font-size: 13px;
  display: block;
  overflow-x: auto;
}

.md-body :deep(th),
.md-body :deep(td) {
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  text-align: left;
}

.md-body :deep(th) {
  background: #f8fafc;
  font-weight: 600;
}

.md-body :deep(a) {
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.md-body :deep(hr) {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 12px 0;
}

.md-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>
