import { createUniqueId, type Signal } from "solid-js";
import WithLabel from "./with-label";

type Props = {
  value: Signal<number>;
  label: string;
};

export default function SliderWithLabel(props: Props) {
  const id = createUniqueId();
  const [value, setValue] = props.value;
  const label = () => `${props.label} : ${value()}`;

  return (
    <WithLabel label={label} for={id}>
      <input
        type="range"
        min="0"
        max="2"
        step="0.2"
        value={value()}
        class="range"
        onInput={(e) => setValue(Number(e.target.value))}
        id={id}
      />
    </WithLabel>
  );
}
