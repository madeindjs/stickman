import type { Accessor, JSX } from "solid-js";
import { toAccessor } from "../../utils/solid.utils";

type Props = {
  label: string | Accessor<string>;
  labelTopRight?: string;
  labelBottomLeft?: string;
  labelBottomRight?: string;
  children: JSX.Element;
};

export default function WithLabel(props: Props) {
  const label = toAccessor(props.label);
  const labelTopRight = toAccessor(props.labelTopRight);
  const labelBottomLeft = toAccessor(props.labelBottomLeft);
  const labelBottomRight = toAccessor(props.labelBottomRight);

  const displayBottom = () => labelBottomLeft() || labelBottomRight();

  return (
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">{label()}</span>
        {labelTopRight() && <span class="label-text-alt">{labelTopRight()}</span>}
      </div>
      {props.children}
      {displayBottom() && (
        <div class="label">
          {labelBottomLeft() && <span class="label-text-alt">{labelBottomLeft()}</span>}
          {labelBottomRight() && <span class="label-text-alt">{labelBottomRight()}</span>}
        </div>
      )}
    </label>
  );
}
