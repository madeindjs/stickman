import { createSignal, onCleanup, onMount } from "solid-js";
import type { Point } from "../model";

/**
 * Listen and compute the cursor position in a SVG.
 */
export default function useCursorPositionInSVG(el: SVGSVGElement) {
  const [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);

  const viewBox = el.getAttribute("viewBox");

  if (!viewBox) throw Error("Element doesn't have viewBox");

  const [vX, vY, vXMax, vYMax] = viewBox.split(" ").map(Number);

  function onMove(e: MouseEvent) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPosition([x * (vXMax / rect.width) + vX, y * (vYMax / rect.height) + vY]);
  }

  onMount(() => el.addEventListener("mousemove", onMove));
  onCleanup(() => el.removeEventListener("mousemove", onMove));

  return cursorPosition;
}
