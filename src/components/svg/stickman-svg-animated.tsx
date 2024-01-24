import type { StickmanDefinitionV1 } from "../../model";

import { Show, type Accessor } from "solid-js";
import { generateStickmansPoints } from "../../utils/stickman.utils";
import { getStickmanPaths } from "../../utils/svg.utils";
import AnimateCircle from "./animate/circle";
import AnimatePath from "./animate/path";
import StickmanSVGInner from "./stickman-svg-inner";
import StickmanSVGWrapper from "./stickman-svg-wrapper";

type Props = {
  definition: Accessor<StickmanDefinitionV1>;
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
  const pointsList = () => Array.from(generateStickmansPoints(definition()));
  const points = () => pointsList()[0];
  const paths = () => pointsList().map(getStickmanPaths);

  const dur = () => (definition().animation.timeBetweenFrames * pointsList().length).toPrecision(2);
  const loop = () => definition().animation.loop;

  function getPathsForItem(item: keyof ReturnType<typeof getStickmanPaths>): Accessor<string[]> {
    return () => paths().map((p) => p[item]());
  }

  return (
    <StickmanSVGWrapper
      ref={ref}
      height={height}
      width={width}
      strokeWidth={definition().configuration.lineWidth}
      className={className}
    >
      <Show when={points()}>
        <StickmanSVGInner
          configuration={() => definition().configuration}
          points={points}
          childrenHead={<AnimateCircle paths={() => pointsList().map((p) => p.head)} dur={dur} loop={loop} />}
          childrenArmLeft={<AnimatePath paths={getPathsForItem("armLeft")} dur={dur} loop={loop} />}
          childrenArmRight={<AnimatePath paths={getPathsForItem("armRight")} dur={dur} loop={loop} />}
          childrenBody={<AnimatePath paths={getPathsForItem("body")} dur={dur} loop={loop} />}
          childrenLegLeft={<AnimatePath paths={getPathsForItem("legLeft")} dur={dur} loop={loop} />}
          childrenLegRight={<AnimatePath paths={getPathsForItem("legRight")} dur={dur} loop={loop} />}
        />
      </Show>
    </StickmanSVGWrapper>
  );
}
