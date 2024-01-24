import type { Accessor, Signal } from "solid-js";
import { For, Show } from "solid-js";
import type { StickmanConfiguration, StickmanPoints } from "../../model";
import StickmanSVG from "../svg/stickman-svg";

type Props = {
  snapshots: Signal<StickmanPoints[]>;
  configuration: Accessor<StickmanConfiguration>;
  selected: Signal<number | undefined>;
  onAddSnapshot: () => void;
};

export default function EditorSnapshots({
  configuration,
  snapshots: snapshotSignal,
  selected: selectedSignal,
  onAddSnapshot,
}: Props) {
  const [snapshots, setSnapshots] = snapshotSignal;
  const [selected, setSelected] = selectedSignal;

  return (
    <div class="flex overflow-x-auto bg-base-300 border-t">
      <div class="flex gap-1">
        <For each={snapshots()}>
          {(points, i) => (
            <Snapshot
              position={() => i() + 1}
              onClick={() => (selected() === i() ? setSelected(undefined) : setSelected(i()))}
              configuration={configuration()}
              points={points}
              selected={() => selected() === i()}
              onRemove={() => {
                setSnapshots(snapshots().filter((_, index) => i() !== index));
                setSelected();
              }}
            />
          )}
        </For>
        <div class="border flex items-center justify-center w-28">
          <button type="button" class="btn btn-primary btn-circle text-3xl" onClick={onAddSnapshot}>
            +<span class="sr-only">Add snapshot</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Snapshot(props: {
  position: Accessor<number>;
  selected: Accessor<boolean>;
  configuration: StickmanConfiguration;
  points: StickmanPoints;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      class="border relative"
      classList={{
        "border-primary rounded": props.selected(),
      }}
    >
      <span
        class="badge badge-neutral absolute top-0.5 left-0.5"
        classList={{
          "badge-primary": props.selected(),
        }}
      >
        {props.position()}
      </span>
      <StickmanSVG
        points={() => props.points}
        configuration={() => props.configuration}
        onClick={props.onClick}
        height={200}
        width={100}
        className="bg-white"
      />
      <Show when={props.selected()}>
        <div class="absolute bottom-0">
          <button class="btn btn-sm" type="button" onClick={props.onRemove}>
            🗑️ Remove
          </button>
        </div>
      </Show>
    </div>
  );
}
