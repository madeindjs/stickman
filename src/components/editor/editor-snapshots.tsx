import type { Accessor, Signal } from "solid-js";
import { For, Show } from "solid-js";
import type { Stickman, StickmanConfiguration, StickmanPoints } from "../../model";
import { buildStickman } from "../../utils/stickman.utils";
import StickmanSVG from "../svg/stickman-svg";

type Props = {
  snapshots: Signal<StickmanPoints[]>;
  configuration: Accessor<StickmanConfiguration>;
  selected: Signal<number | undefined>;
};

export default function EditorSnapshots({ configuration, snapshots: snapshotSignal, selected: selectedSignal }: Props) {
  const [snapshots, setSnapshots] = snapshotSignal;
  const [selected, setSelected] = selectedSignal;

  return (
    <div class="flex overflow-x-auto bg-base-300">
      <div class="flex gap-1">
        <For each={snapshots().map((points) => buildStickman(configuration(), points))}>
          {(stick, i) => (
            <Snapshot
              position={() => i() + 1}
              onClick={() => (selected() === i() ? setSelected(undefined) : setSelected(i()))}
              stickman={stick}
              selected={() => selected() === i()}
              onRemove={() => {
                setSnapshots(snapshots().filter((_, index) => i() !== index));
                setSelected();
              }}
            />
          )}
        </For>
      </div>
    </div>
  );
}

function Snapshot(props: {
  position: Accessor<number>;
  selected: Accessor<boolean>;
  stickman: Stickman;
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
        stickman={() => props.stickman}
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
