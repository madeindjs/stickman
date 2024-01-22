import type { Accessor } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { DEFAULT_VIEWBOX } from "../../constants";
import { SVGViewbox } from "../../model";

type Props = {
  strokeWidth: number;
  children?: JSX.Element;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
  viewBox?: Accessor<SVGViewbox>;
  onClick?: () => void;
};

export default function StickmanSVGWrapper({ strokeWidth, ref, width, height, children, viewBox, onClick }: Props) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox={viewBox?.().join(" ") ?? DEFAULT_VIEWBOX.join(" ")}
      stroke="black"
      stroke-width={strokeWidth}
      fill="transparent"
      onClick={onClick}
    >
      {children}
    </svg>
  );
}
