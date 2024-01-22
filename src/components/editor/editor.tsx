import { For, Show, createEffect, createSignal, onMount } from "solid-js";
import useCursorPositionInSVG from "../../hooks/use-cursor-position-in-svg";
import { usePersistentState } from "../../hooks/use-persistent-state";
import type { Point, StickmanPoints } from "../../model.js";
import { generateStickmanMovementDefinitionV1 } from "../../utils/movements.utils";
import { buildStickman } from "../../utils/stickman.utils.js";
import StickmanSVGAnimated from "../svg/stickman-svg-animated";
import StickmanSVG from "../svg/stickman-svg.jsx";
import EditorExport from "./editor-export.jsx";
import EditorHandle from "./editor-handle.jsx";
import EditorSnapshots from "./editor-snapshots";
import "./editor.css";

export default function Editor() {
  let svg: SVGSVGElement;

  const [stickman, setStickman] = createSignal(buildStickman());
  const [snapshots, setSnapshots] = createSignal<StickmanPoints[]>([]);
  const [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);

  usePersistentState("editor__stickman", [stickman, setStickman]);
  usePersistentState("editor__snapshots", [snapshots, setSnapshots]);

  const conf = () => stickman().configuration;
  const points = () => stickman().points;

  const pointsNames = () => Object.entries(stickman().points) as [keyof StickmanPoints, Point][];

  const movementDefinition = () => generateStickmanMovementDefinitionV1(conf(), snapshots());

  function onDragged(key: keyof StickmanPoints, point: Point) {
    setStickman(buildStickman(conf(), { ...points(), [key]: point }));
  }

  onMount(() => {
    const cursor = useCursorPositionInSVG(svg);
    createEffect(() => setCursorPosition(cursor()));
  });

  return (
    <div class="editor">
      <div class="editor__panel">
        <div class="editor__panel__left">
          <p>Editor</p>
          <StickmanSVG ref={svg} stickman={stickman} height={500} width={300}>
            <For each={pointsNames()}>
              {([key, [x, y]]) => (
                <EditorHandle
                  cx={x}
                  cy={y}
                  onDragged={(point) => onDragged(key, point)}
                  cursorPosition={cursorPosition}
                />
              )}
            </For>
          </StickmanSVG>
        </div>
        <div class="editor__panel__right">
          <p>Preview</p>
          <StickmanSVGAnimated definition={movementDefinition} height={500} width={300} />
        </div>
      </div>
      <div class="editor__toolbar">
        <button
          onClick={() => {
            setSnapshots([...snapshots(), stickman().points]);
          }}
        >
          Add Snapshot
        </button>
      </div>
      <Show when={snapshots().length > 0}>
        <EditorExport snapshots={snapshots} configuration={() => conf()} />
        <EditorSnapshots snapshots={[snapshots, setSnapshots]} configuration={() => conf()} />
      </Show>
    </div>
  );
}
