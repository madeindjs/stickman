import type { Signal } from "solid-js";
import { createUniqueId } from "solid-js";
import ChackboxWithLabel from "../core/checkbox-with-label";
import SliderWithLabel from "../core/slider-with-label";
import WithLabel from "../core/with-label";

type Props = {
  timeBetweenFrames: Signal<number>;
  loop: Signal<boolean>;
  onReset: () => void;
  onExport: () => void;
};

export default function EditorSettings(props: Props) {
  const nameId = createUniqueId();

  return (
    <div class="border-r p-4 bg-base-100 flex flex-col gap-2">
      <p class="text-2xl">Settings</p>
      <div class="flex flex-col gap-2 flex-grow">
        <WithLabel label={() => "name"} for={nameId}>
          <input type="text" placeholder="Type here" class="input input-bordered w-full" id={nameId} />
        </WithLabel>

        <SliderWithLabel label="Time between frames" value={props.timeBetweenFrames} />

        <ChackboxWithLabel value={props.loop} label="Animation loop" />
      </div>

      <div class="join">
        <button class="btn btn-warning btn-outline join-item" onClick={props.onReset}>
          🗑️ Reset
        </button>
        <button class="btn btn-secondary join-item" onClick={props.onExport}>
          💾 Save image
        </button>
      </div>
    </div>
  );
}
