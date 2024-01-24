import type { Accessor } from "solid-js";

async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

export function useCopyToClipboard(value: Accessor<string>) {
  return () => copyContent(value()).catch(console.error);
}
