export async function fetchTools() {
    const response = await fetch("/api/tools");
    if (!response.ok) {
        throw new Error(`加载工具失败: ${response.status}`);
    }
    return (await response.json());
}
