import { For, createEffect, createSignal, onMount } from "solid-js";
import type { Point, StickmanPoints } from "../model";
import { Stickman } from "../stickman.mjs";
import "./editor.css";
import Handle from "./handle";
import useCursorPositionInSVG from "./hooks/use-cursor-position-in-svg";
import StickmanSVG from "./stickman-svg";

export default function Editor() {
  const [stickman, setStickman] = createSignal(new Stickman());
  const [snapshots, setSnapshots] = createSignal<Stickman[]>([]);

  let svg: SVGSVGElement;

  let [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);

  const pointsNames = () => Object.entries(stickman().points) as [keyof StickmanPoints, Point][];

  onMount(() => {
    const cursor = useCursorPositionInSVG(svg);

    createEffect(() => {
      setCursorPosition(cursor());
    });
  });

  function onDragged(key: keyof StickmanPoints, point: Point) {
    const newStickman = stickman().clone();

    newStickman.points = {
      ...newStickman.points,
      [key]: point,
    };

    setStickman(newStickman);
  }

  return (
    <div>
      <StickmanSVG ref={svg} stickman={stickman} height={500} width={500}>
        <For each={pointsNames()}>
          {([key, [x, y]]) => (
            <Handle cx={x} cy={y} onDragged={(point) => onDragged(key, point)} cursorPosition={cursorPosition} />
          )}
        </For>
      </StickmanSVG>
      <div class="editor__toolbar">
        <button
          onClick={() => {
            setSnapshots([...snapshots(), stickman().clone()]);
          }}
        >
          Add Snapshot
        </button>
      </div>
      <div class="editor__snapshots">
        <div class="editor__snapshots__wrapper">
          <For each={snapshots()}>{(snapshot) => <StickmanSVG stickman={() => snapshot} />}</For>
        </div>
      </div>
    </div>
  );
}
