import type { Signal } from "solid-js";
import SliderWithLabel from "../core/slider-with-label";

type Props = {
  timeBetweenFrames: Signal<number>;
  onReset: () => void;
};

export default function EditorSettings(props: Props) {
  return (
    <div class="border-r p-1 bg-black flex flex-col gap-2">
      <div>
        <button class="btn btn-warning btn-outline" onClick={props.onReset}>
          🗑️ Reset
        </button>
      </div>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Name</span>
        </div>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </label>

      <SliderWithLabel label="Time between frames" value={props.timeBetweenFrames} />
    </div>
  );
}
