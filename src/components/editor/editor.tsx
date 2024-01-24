import { For, Show, createEffect, createSignal, onMount } from "solid-js";
import useCursorPositionInSVG from "../../hooks/use-cursor-position-in-svg";
import { useSVGExporter } from "../../hooks/use-svg-exporter";
import type { Point, StickmanDefinitionV1, StickmanPoints } from "../../model.js";
import { buildStickmanConfiguration, buildStickmanPoints } from "../../utils/stickman.utils.js";
import StickmanSVGAnimated from "../svg/stickman-svg-animated";
import StickmanSVG from "../svg/stickman-svg.jsx";
import EditorHandle from "./editor-handle.jsx";
import EditorSettings from "./editor-settings";
import EditorSnapshots from "./editor-snapshots";
import { useSnapshots } from "./hooks/use-snapshots";

export default function Editor() {
  let svgEditor: SVGSVGElement;
  let svgPreview: SVGSVGElement;

  const [timeBetweenFrames, setTimeBetweenFrames] = createSignal(0.2);
  const [loop, setLoop] = createSignal(false);
  const [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);
  const [configuration] = createSignal(buildStickmanConfiguration());
  const [points, setPoints] = createSignal(buildStickmanPoints(configuration()));

  const {
    snapshots: [snapshots, setSnapshots],
    selected: [snapshotSelectedIndex, setSnapshotSelectedIndex],
    updateSelectedSnapshot,
  } = useSnapshots(setPoints);

  const exportSVG = useSVGExporter(svgPreview);

  const pointsNames = () => Object.entries(points()) as [keyof StickmanPoints, Point][];

  const movementDefinition = (): StickmanDefinitionV1 => ({
    animation: {
      loop: loop(),
      timeBetweenFrames: timeBetweenFrames(),
    },
    configuration: configuration(),
    movements: snapshots(),
    version: 1,
  });

  function onDragged(key: keyof StickmanPoints, point: Point) {
    const newPoints: StickmanPoints = { ...points(), [key]: point };
    updateSelectedSnapshot(newPoints);
    setPoints(newPoints);
  }

  const addSnapshot = () => setSnapshots([...snapshots(), points()]);

  function reset() {
    setSnapshots([]);
    setPoints(buildStickmanPoints(configuration()));
  }

  onMount(() => {
    const cursor = useCursorPositionInSVG(svgEditor);
    createEffect(() => setCursorPosition(cursor()));
  });

  return (
    <div class="border rounded">
      <div class="grid grid-cols-3 gap-2 content-center">
        <EditorSettings
          onReset={reset}
          timeBetweenFrames={[timeBetweenFrames, setTimeBetweenFrames]}
          loop={[loop, setLoop]}
          onExport={exportSVG}
        />
        <div class="flex flex-col items-center gap-2 p-4">
          <p class="text-2xl">Editor</p>
          <StickmanSVG
            ref={svgEditor}
            configuration={configuration}
            points={points}
            height={500}
            width={300}
            className="bg-white rounded"
          >
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
        <div class="flex flex-col items-center gap-2 p-4">
          <p class="text-2xl">Preview</p>
          <Show when={snapshots().length > 0}>
            <StickmanSVGAnimated
              definition={movementDefinition}
              height={500}
              width={300}
              className="bg-white rounded"
              ref={svgPreview}
            />
          </Show>
          <Show when={snapshots().length === 0}>
            <div class="flex flex-col gap-2 flex-grow items-center justify-center">
              <p role="alert" class="alert">
                Add a snapshot to see the preview.
              </p>
              <button type="button" class="btn btn-primary" onClick={addSnapshot}>
                Add snapshot
              </button>
            </div>
          </Show>
        </div>
      </div>
      <Show when={snapshots().length > 0}>
        <EditorSnapshots
          snapshots={[snapshots, setSnapshots]}
          configuration={() => configuration()}
          selected={[snapshotSelectedIndex, setSnapshotSelectedIndex]}
          onAddSnapshot={addSnapshot}
        />
      </Show>
    </div>
  );
}
