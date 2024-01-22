import { render } from "solid-js/web";
import { StickmanMovementDefinitionV1 } from "../../model";
import StickmanSVGAnimated from "./stickman-svg-animated";

export function buildAnimatedStickmanOnElement(
  definition: StickmanMovementDefinitionV1,
  div = document.createElement("div")
) {
  render(() => <StickmanSVGAnimated definition={() => definition} />, div);

  return div;
}
