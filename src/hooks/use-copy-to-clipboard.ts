import type { Accessor } from "solid-js";

function hasPermission() {
  return new Promise((res, rej) => {
    // @ts-ignore
    navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        res(true);
      } else {
        rej(new Error("Can't have permission to write to the clipboard"));
      }
    });
  });
}

async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

export function useCopyToClipboard(value: Accessor<string>) {
  return () => copyContent(value()).catch(console.error);
}
