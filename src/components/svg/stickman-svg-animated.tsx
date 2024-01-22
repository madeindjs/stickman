import type { SVGViewbox, StickmanMovementDefinitionV1 } from "../../model";

import type { Accessor } from "solid-js";
import { For, createSignal, onCleanup } from "solid-js";
import { VIEWBOX_HEIGHT, VIEWBOX_WIDTH } from "../../constants";
import { useAnimationFrame } from "../../hooks/use-animation-frame";
import { generateStickmans } from "../../utils/stickman.utils";
import StickmanSVGInner from "./stickman-svg-inner";
import StickmanSVGWrapper from "./stickman-svg-wrapper";

type Props = {
  definition: Accessor<StickmanMovementDefinitionV1>;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
};

/**
 * Display an animated Stickman folowing the definition.
 *
 * The idea is to create all stickmans in the same SVG and then just update the view box to display them.
 */
export default function StickmanSVGAnimated({ definition, width = 100, height = 100, ref }: Props) {
  const stickmans = () => Array.from(generateStickmans(definition()));

  const [frameIndex, setFrameIndex] = createSignal(0);

  const viewBox = (): SVGViewbox => [frameIndex() * VIEWBOX_WIDTH, 0, VIEWBOX_WIDTH, VIEWBOX_HEIGHT];

  function tick() {
    setFrameIndex((frameIndex() + 1) % stickmans().length);
  }

  const stopAnimation = useAnimationFrame(tick, 100);

  onCleanup(stopAnimation);

  return (
    <StickmanSVGWrapper ref={ref} height={height} width={width} strokeWidth={1} viewBox={viewBox}>
      <For each={stickmans()}>{(stickman) => <StickmanSVGInner stickman={() => stickman} />}</For>
    </StickmanSVGWrapper>
  );
}
