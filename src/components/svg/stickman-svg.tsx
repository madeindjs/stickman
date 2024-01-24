import type { Accessor, JSX } from "solid-js";
import { VIEWBOX_HEIGHT, VIEWBOX_WIDTH } from "../../constants.js";
import type { StickmanConfiguration, StickmanPoints } from "../../model.js";
import StickmanSVGInner from "./stickman-svg-inner.jsx";
import StickmanSVGWrapper from "./stickman-svg-wrapper.jsx";

type Props = {
  configuration: Accessor<StickmanConfiguration>;
  points: Accessor<StickmanPoints>;
  children?: JSX.Element;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
  onClick?: () => void;
  className?: string;
};

export default function StickmanSVG({
  configuration,
  points,
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
      strokeWidth={configuration().lineWidth}
      onClick={onClick}
      className={className}
    >
      <StickmanSVGInner configuration={configuration} points={points} />
      {children}
    </StickmanSVGWrapper>
  );
}
