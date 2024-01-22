import type { Accessor, JSX } from "solid-js";
import { VIEWBOX_HEIGHT, VIEWBOX_WIDTH } from "../../constants.js";
import type { Stickman } from "../../model.js";
import StickmanSVGInner from "./stickman-svg-inner.jsx";
import StickmanSVGWrapper from "./stickman-svg-wrapper.jsx";

type Props = {
  stickman: Accessor<Stickman>;
  children?: JSX.Element;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
  onClick?: () => void;
  className?: string;
};

export default function StickmanSVG({
  stickman,
  width = VIEWBOX_WIDTH,
  height = VIEWBOX_HEIGHT,
  children,
  ref,
  onClick,
  className,
}: Props) {
  return (
    <StickmanSVGWrapper
      ref={ref}
      height={height}
      width={width}
      strokeWidth={stickman().configuration.lineWidth}
      viewBox={() => [0, 0, VIEWBOX_WIDTH, VIEWBOX_HEIGHT]}
      onClick={onClick}
      className={className}
    >
      <StickmanSVGInner stickman={stickman} />
      {children}
    </StickmanSVGWrapper>
  );
}
