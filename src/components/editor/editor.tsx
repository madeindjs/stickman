import { For, createEffect, createSignal, onMount } from "solid-js";
import useCursorPositionInSVG from "../../hooks/use-cursor-position-in-svg";
import { useSVGExporter } from "../../hooks/use-svg-exporter";
import type { Point, StickmanPoints } from "../../model.js";
import { generateStickmanMovementDefinitionV1 } from "../../utils/movements.utils";
import { buildStickman } from "../../utils/stickman.utils.js";
import StickmanSVGAnimated from "../svg/stickman-svg-animated";
import StickmanSVG from "../svg/stickman-svg.jsx";
import EditorHandle from "./editor-handle.jsx";
import EditorSettings from "./editor-settings";
import EditorSnapshots from "./editor-snapshots";
import { useSnapshots } from "./hooks/use-snapshots";
import { useStickman } from "./hooks/use-stickman";

export default function Editor() {
  let svgEditor: SVGSVGElement;
  let svgPreview: SVGSVGElement;

  const [timeBetweenFrames, setTimeBetweenFrames] = createSignal(0.2);
  const [cursorPosition, setCursorPosition] = createSignal<Point>([-1, -1]);

  const {
    stickman: [stickman, setStickman],
    updateStickmanPoints,
  } = useStickman();

  const {
    snapshots: [snapshots, setSnapshots],
    selected: [snapshotSelectedIndex, setSnapshotSelectedIndex],
    updateSelectedSnapshot,
  } = useSnapshots([stickman, setStickman]);

  const exportSVG = useSVGExporter(svgPreview);

  const conf = () => stickman().configuration;
  const points = () => stickman().points;

  const pointsNames = () => Object.entries(stickman().points) as [keyof StickmanPoints, Point][];

  const movementDefinition = () =>
    generateStickmanMovementDefinitionV1(conf(), snapshots(), { timeBetweenFrames: timeBetweenFrames() });

  function onDragged(key: keyof StickmanPoints, point: Point) {
    const newPoints: StickmanPoints = { ...points(), [key]: point };
    updateSelectedSnapshot(newPoints);
    updateStickmanPoints(newPoints);
  }

  const addSnapshot = () => setSnapshots([...snapshots(), stickman().points]);

  function reset() {
    setSnapshots([]);
    setStickman(buildStickman());
  }

  onMount(() => {
    const cursor = useCursorPositionInSVG(svgEditor);
    createEffect(() => setCursorPosition(cursor()));
  });

  return (
    <div class="border rounded">
      <div class="grid grid-cols-3 gap-2 content-center">
        <EditorSettings onReset={reset} timeBetweenFrames={[timeBetweenFrames, setTimeBetweenFrames]} />
        <div class="flex flex-col items-center gap-2 p-4">
          <p class="text-2xl">Editor</p>
          <StickmanSVG ref={svgEditor} stickman={stickman} height={500} width={300} className="bg-white rounded">
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
          <StickmanSVGAnimated
            definition={movementDefinition}
            height={500}
            width={300}
            className="bg-white rounded"
            ref={svgPreview}
          />
        </div>
      </div>
      <EditorSnapshots
        snapshots={[snapshots, setSnapshots]}
        configuration={() => conf()}
        selected={[snapshotSelectedIndex, setSnapshotSelectedIndex]}
        onAddSnapshot={addSnapshot}
      />
    </div>
  );
}
