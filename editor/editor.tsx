import { Accessor, For, createSignal, onCleanup, onMount } from "solid-js";
import { movePoint } from "../geometry.utils.mjs";
import type { Point, StickmanPoints } from "../model";
import { Stickman } from "../stickman.mjs";
import "./editor.css";
import StickmanSVG from "./stickman-svg";

export default function Editor() {
  const [stickman, setStickman] = createSignal(new Stickman());
  const [selectedPoint, setSelectedPoint] = createSignal<keyof StickmanPoints>();
  const [snapshots, setSnapshots] = createSignal<Stickman[]>([]);

  const pointsNames = () => Object.entries(stickman().points) as [keyof StickmanPoints, Point][];

  function moveActiveHandles(movement: Point) {
    const newStickman = stickman().clone();
    const point = movePoint(newStickman.points[selectedPoint()], movement);

    newStickman.points = {
      ...newStickman.points,
      [selectedPoint()]: point,
    };

    setStickman(newStickman);
  }

  function onKeydown(event: KeyboardEvent) {
    event.preventDefault();

    switch (event.keyCode) {
      case KEY.Left:
        return moveActiveHandles([-1, 0]);
      case KEY.Right:
        return moveActiveHandles([1, 0]);
      case KEY.Down:
        return moveActiveHandles([0, 1]);
      case KEY.Up:
        return moveActiveHandles([0, -1]);
    }
  }

  onMount(() => document.addEventListener("keydown", onKeydown));

  onCleanup(() => document.removeEventListener("keydown", onKeydown));

  return (
    <div>
      <StickmanSVG stickman={stickman} height={500} width={500}>
        <For each={pointsNames()}>
          {([key, [x, y]]) => (
            <Handle cx={x} cy={y} onClick={() => setSelectedPoint(key)} active={() => selectedPoint() === key} />
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

type HandleProps = {
  cx: number;
  cy: number;
  onClick: () => void;
  active?: Accessor<boolean>;
};

function Handle({ cx, cy, active, onClick }: HandleProps) {
  const stroke = () => (active() ? "red" : "grey");

  return <circle onClick={() => onClick()} cx={cx} cy={cy} r="1" stroke-width="1" stroke={stroke()} />;
}

const KEY = Object.freeze({
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
});
