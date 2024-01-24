import type { StickmanDefinitionV1 } from "../../model";

import type { Accessor } from "solid-js";
import { generateStickmansPoints } from "../../utils/stickman.utils";
import { getStickmanPaths } from "../../utils/svg.utils";
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
  const paths = () => pointsList().map(getStickmanPaths);

  const dur = () => (definition().animation.timeBetweenFrames * pointsList().length).toPrecision(2);
  const loop = () => definition().animation.loop;

  function getPathsForItem(item: keyof ReturnType<typeof getStickmanPaths>): Accessor<string[]> {
    return () => paths().map((p) => p[item]());
  }

  return (
    <StickmanSVGWrapper ref={ref} height={height} width={width} strokeWidth={1} className={className}>
      <StickmanSVGInner
        configuration={() => definition().configuration}
        points={() => pointsList()[0]}
        childrenArmLeft={<AnimatePath paths={getPathsForItem("armLeft")} dur={dur} loop={loop} />}
        childrenArmRight={<AnimatePath paths={getPathsForItem("armRight")} dur={dur} loop={loop} />}
        childrenBody={<AnimatePath paths={getPathsForItem("body")} dur={dur} loop={loop} />}
        childrenLegLeft={<AnimatePath paths={getPathsForItem("legLeft")} dur={dur} loop={loop} />}
        childrenLegRight={<AnimatePath paths={getPathsForItem("legRight")} dur={dur} loop={loop} />}
      />
    </StickmanSVGWrapper>
  );
}

type AnimatePathProps = { paths: Accessor<string[]>; dur: Accessor<string>; loop: Accessor<boolean> };

function AnimatePath({ paths, dur, loop }: AnimatePathProps) {
  const from = () => paths()[0];
  const values = () => (loop() ? [...paths(), from()] : paths()).join(";");

  return <animate attributeName="d" values={values()} dur={dur().toString()} repeatCount="indefinite" />;
}
