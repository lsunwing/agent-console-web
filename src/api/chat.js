function parseSseBlocks(chunkBuffer) {
    const blocks = chunkBuffer.split("\n\n");
    const rest = blocks.pop() ?? "";
    const events = blocks
        .map((block) => {
        const dataLines = block
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trimStart());
        if (!dataLines.length) {
            return null;
        }
        const payload = dataLines.join("\n");
        if (payload === "[DONE]") {
            return null;
        }
        try {
            return JSON.parse(payload);
        }
        catch {
            return null;
        }
    })
        .filter(Boolean);
    return { events, rest };
}
export async function streamChat(payload, options) {
    const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream"
        },
        body: JSON.stringify(payload),
        signal: options.signal
    });
    if (!response.ok || !response.body) {
        throw new Error(`流式请求失败: ${response.status}`);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        buffer += decoder.decode(value, { stream: true });
        const parsed = parseSseBlocks(buffer);
        buffer = parsed.rest;
        parsed.events.forEach(options.onEvent);
    }
    if (buffer.trim()) {
        const parsed = parseSseBlocks(`${buffer}\n\n`);
        parsed.events.forEach(options.onEvent);
    }
}
