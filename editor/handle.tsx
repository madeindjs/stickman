import { Accessor, createSignal, onCleanup, onMount } from "solid-js";
import type { Point } from "../model";

type Props = {
  cx: number;
  cy: number;
  onDragged: (point: Point) => void;
  cursorPosition?: Accessor<Point>;
};

export default function Handle(props: Props) {
  let circle: SVGCircleElement;

  const [cx, setCx] = createSignal(props.cx);
  const [cy, setCy] = createSignal(props.cy);
  const [dragging, setDragging] = createSignal(false);

  const cursorX = () => props.cursorPosition()?.[0] - 1;
  const cursorY = () => props.cursorPosition()?.[1] - 1;

  function onDragStart(event: MouseEvent) {
    setDragging(true);
  }

  function onDragEnd(event: MouseEvent) {
    if (!dragging()) return;
    setDragging(false);
    updatePosition();
  }

  function updatePosition() {
    const p = props.cursorPosition?.();
    if (!p) return;
    setCx(p[0]);
    setCy(p[1]);

    props.onDragged(p);
  }

  onMount(() => {
    circle.addEventListener("mousedown", onDragStart);
    circle.addEventListener("mouseup", onDragEnd);
    document.addEventListener("mouseup", onDragEnd);
  });

  onCleanup(() => {
    circle.removeEventListener("mousedown", onDragStart);
    document.removeEventListener("mouseup", onDragEnd);
  });

  return (
    <>
      <circle cx={cx()} cy={cy()} r="1" stroke-width="1" stroke="grey" ref={circle} />
      {dragging() && (
        <g>
          <circle cx={cursorX()} cy={cursorY()} r="1" stroke-width="1" stroke="red" />
          <path stroke-width="0.5" stroke="grey" d={`M${cx()} ${cy()} L ${cursorX()} ${cursorY()}`} />
        </g>
      )}
    </>
  );
}
