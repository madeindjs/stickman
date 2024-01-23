import type { StickmanMovementDefinitionV1 } from "../../model";

import type { Accessor } from "solid-js";
import { generateStickmans } from "../../utils/stickman.utils";
import { getStickmanPaths } from "../../utils/svg.utils";
import StickmanSVGInner from "./stickman-svg-inner";
import StickmanSVGWrapper from "./stickman-svg-wrapper";

type Props = {
  definition: Accessor<StickmanMovementDefinitionV1>;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
  className?: string;
};

/**
 * Display an animated Stickman folowing the definition.
 *
 * The idea is to create all stickmans in the same SVG and then just update the view box to display them.
 */
export default function StickmanSVGAnimated({ definition, width = 100, height = 100, ref, className }: Props) {
  const stickmans = () => Array.from(generateStickmans(definition()));
  const paths = () => stickmans().map((s) => getStickmanPaths(s.points));

  const dur = () => `${definition().animation.timeBetweenFrames * stickmans().length}s`;

  function getPathsForItem(item: keyof ReturnType<typeof getStickmanPaths>): Accessor<string[]> {
    return () => paths().map((p) => p[item]());
  }

  return (
    <StickmanSVGWrapper ref={ref} height={height} width={width} strokeWidth={1} className={className}>
      <StickmanSVGInner
        stickman={() => stickmans()[0]}
        childrenArmLeft={<AnimatePath paths={getPathsForItem("armLeft")} dur={dur} />}
        childrenArmRight={<AnimatePath paths={getPathsForItem("armRight")} dur={dur} />}
        childrenBody={<AnimatePath paths={getPathsForItem("body")} dur={dur} />}
        childrenLegLeft={<AnimatePath paths={getPathsForItem("legLeft")} dur={dur} />}
        childrenLegRight={<AnimatePath paths={getPathsForItem("legRight")} dur={dur} />}
      />
    </StickmanSVGWrapper>
  );
}

function AnimatePath({ paths, dur }: { paths: Accessor<string[]>; dur: Accessor<string> }) {
  const from = () => paths()[0];
  const to = () => paths()[paths().length - 1];

  const values = () =>
    paths()
      .map((p) => p)
      .join(";");

  return <animate attributeName="d" from={from()} to={to()} values={values()} dur={dur()} repeatCount="indefinite" />;
}
