// @ts-nocheck
import { For, createSignal, onCleanup, onMount } from "solid-js";
import { movePoint } from "../geometry.utils.mjs";
import { Stickman } from "../stickman.mjs";
import "./editor.css";
import EditorSvg from "./svg";

export default function Editor() {
  const [stickman, setStickman] = createSignal(new Stickman());
  const [selectedPoint, setSelectedPoint] = createSignal();
  const [snapshots, setSnapshots] = createSignal([]);

  const pointsNames = () => Object.entries(stickman().points);

  /**
   * @param {import("../model").Point} movement
   */
  function moveActiveHandles(movement) {
    const newStickman = stickman().clone();
    const point = movePoint(newStickman.points[selectedPoint()], movement);

    newStickman.points = {
      ...newStickman.points,
      [selectedPoint()]: point,
    };

    setStickman(newStickman);
  }

  /** @param {KeyboardEvent} event */
  function onKeydown(event) {
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
      <EditorSvg stickman={stickman} height={500} width={500}>
        <For each={pointsNames()}>
          {([key, [x, y]]) => (
            <Handle cx={x} cy={y} onClick={() => setSelectedPoint(key)} active={() => selectedPoint() === key} />
          )}
        </For>
      </EditorSvg>
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
          <For each={snapshots()}>{(snapshot) => <EditorSvg stickman={() => snapshot} />}</For>
        </div>
      </div>
    </div>
  );
}

/**
 * @typedef Props
 * @property {number} cx
 * @property {number} cy
 * @property {() => void} onClick
 * @property {import("solid-js").Accessor<boolean>} [active]
 *
 *
 * @param {Props} param0
 * @returns
 */
function Handle({ cx, cy, active, onClick }) {
  const stroke = () => (active() ? "red" : "grey");

  return <circle onClick={() => onClick()} cx={cx} cy={cy} r="1" stroke-width="1" stroke={stroke()} />;
}

const KEY = Object.freeze({
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
});
