import { render } from "solid-js/web";
import Editor from "./editor";

export function buildEditorOnElement(div = document.createElement("div")) {
  render(() => <Editor />, div);
  return div;
}
