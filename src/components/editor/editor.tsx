import { For, Show, createEffect, createSignal, on, onMount } from "solid-js";
import useCursorPositionInSVG from "../../hooks/use-cursor-position-in-svg";
import { usePersistentState } from "../../hooks/use-persistent-state";
import type { Point, StickmanPoints } from "../../model.js";
import { generateStickmanMovementDefinitionV1 } from "../../utils/movements.utils";
import { buildStickman } from "../../utils/stickman.utils.js";
import StickmanSVGAnimated from "../svg/stickman-svg-animated";
import StickmanSVG from "../svg/stickman-svg.jsx";
import EditorExport from "./editor-export.jsx";
import EditorHandle from "./editor-handle.jsx";
import EditorSettings from "./editor-settings";
import EditorSnapshots from "./editor-snapshots";

export default function Editor() {
  let svg: SVGSVGElement;

  const [timeBetweenFrames, setTimeBetweenFrames] = createSignal(0.2);
  const [stickman, setStickman] = createSignal(buildStickman());
  const [snapshots, setSnapshots] = createSignal<StickmanPoints[]>([]);
  const [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);
  const [snapshotSelectedIndex, setSnapshotSelectedIndex] = createSignal<number | undefined>();

  usePersistentState("editor__stickman", [stickman, setStickman]);
  usePersistentState("editor__snapshots", [snapshots, setSnapshots]);

  const conf = () => stickman().configuration;
  const points = () => stickman().points;

  const pointsNames = () => Object.entries(stickman().points) as [keyof StickmanPoints, Point][];

  const movementDefinition = () =>
    generateStickmanMovementDefinitionV1(conf(), snapshots(), { timeBetweenFrames: timeBetweenFrames() });

  // update stickman if selected snapshot change
  createEffect(
    on(
      () => snapshotSelectedIndex(),
      (value) => {
        console.log(value);
        if (value === undefined) return;
        setStickman(buildStickman(stickman().configuration, snapshots()[value]));
      }
    )
  );

  function onDragged(key: keyof StickmanPoints, point: Point) {
    const newPoints: StickmanPoints = { ...points(), [key]: point };
    if (snapshotSelectedIndex() !== undefined) {
      const snaps = snapshots();
      snaps[snapshotSelectedIndex()] = newPoints;
    }
    setStickman(buildStickman(conf(), newPoints));
  }

  const addSnapshot = () => setSnapshots([...snapshots(), stickman().points]);

  function reset() {
    setSnapshots([]);
    setStickman(buildStickman());
  }

  onMount(() => {
    const cursor = useCursorPositionInSVG(svg);
    createEffect(() => setCursorPosition(cursor()));
  });

  return (
    <div class="border rounded">
      <div class="grid grid-cols-3 gap-2 content-center">
        <EditorSettings onReset={reset} timeBetweenFrames={[timeBetweenFrames, setTimeBetweenFrames]} />
        <div class="flex flex-col items-center gap-2">
          <p class="text-2xl">Editor</p>
          <StickmanSVG ref={svg} stickman={stickman} height={500} width={300} className="bg-white rounded">
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
          <button class="btn btn-primary" onClick={addSnapshot}>
            ➕ Add Snapshot
          </button>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="text-2xl">Preview</p>
          <StickmanSVGAnimated definition={movementDefinition} height={500} width={300} className="bg-white rounded" />
          <EditorExport snapshots={snapshots} configuration={() => conf()} />
        </div>
      </div>
      <Show when={snapshots().length > 0}>
        <EditorSnapshots
          snapshots={[snapshots, setSnapshots]}
          configuration={() => conf()}
          selected={[snapshotSelectedIndex, setSnapshotSelectedIndex]}
        />
      </Show>
    </div>
  );
}
