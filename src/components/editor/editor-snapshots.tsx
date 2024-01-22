import type { Accessor, Signal } from "solid-js";
import { For, Show, createSignal } from "solid-js";
import type { Stickman, StickmanConfiguration, StickmanPoints } from "../../model";
import { buildStickman } from "../../utils/stickman.utils";
import StickmanSVG from "../svg/stickman-svg";
import "./editor-snapshots.css";

type Props = {
  snapshots: Signal<StickmanPoints[]>;
  configuration: Accessor<StickmanConfiguration>;
};

export default function EditorSnapshots({ configuration, snapshots: snapshotSignal }: Props) {
  const [snapshots, setSnapshots] = snapshotSignal;
  const [selected, setSelected] = createSignal<number | undefined>();

  return (
    <div class="editor-snapshots">
      <div class="editor-snapshots__wrapper">
        <For each={snapshots().map((points) => buildStickman(configuration(), points))}>
          {(stick, i) => (
            <Snapshot
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
  selected: Accessor<boolean>;
  stickman: Stickman;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      classList={{
        "editor-snapshots__snaphost": true,
        "editor-snapshots__snaphost--selected": props.selected(),
      }}
    >
      <StickmanSVG stickman={() => props.stickman} onClick={props.onClick} />
      <Show when={props.selected()}>
        <div class="editor-snapshots__snaphost__buttons">
          <button type="button" onClick={props.onRemove}>
            Remove
          </button>
        </div>
      </Show>
    </div>
  );
}
