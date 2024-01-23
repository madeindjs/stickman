import { createUniqueId, type Accessor, type Signal } from "solid-js";
import { toAccessor } from "../../utils/solid.utils";

type Props = {
  label: string | Accessor<string>;
  value: Signal<boolean>;
};

export default function ChackboxWithLabel(props: Props) {
  const [value, setValue] = props.value;
  const label = toAccessor(props.label);
  const id = createUniqueId();

  const toggle = () => setValue(!value());

  return (
    <div class="form-control">
      <label class="label cursor-pointer" for={id}>
        <span class="label-text">{label()}</span>
        <input type="checkbox" checked={value()} class="checkbox " id={id} onChange={toggle} />
      </label>
    </div>
  );
}
