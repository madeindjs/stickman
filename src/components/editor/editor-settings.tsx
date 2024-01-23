import type { Signal } from "solid-js";
import SliderWithLabel from "../core/slider-with-label";
import WithLabel from "../core/with-label";

type Props = {
  timeBetweenFrames: Signal<number>;
  onReset: () => void;
};

export default function EditorSettings(props: Props) {
  return (
    <div class="border-r p-4 bg-black flex flex-col gap-2">
      <div class="flex flex-col gap-2 flex-grow">
        <WithLabel label={() => "name"}>
          <input type="text" placeholder="Type here" class="input input-bordered w-full" />
        </WithLabel>

        <SliderWithLabel label="Time between frames" value={props.timeBetweenFrames} />
      </div>

      <div>
        <button class="btn btn-warning btn-outline" onClick={props.onReset}>
          🗑️ Reset
        </button>
      </div>
    </div>
  );
}
