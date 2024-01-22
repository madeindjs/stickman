import type { Accessor } from "solid-js";
import type { Stickman } from "../model";
import { drawBezierCurve } from "../utils/svg.utils";

export function useSVGStickmanPaths(stickman: Accessor<Stickman>) {
  const points = () => stickman().points;

  const body = () => drawBezierCurve(points().chest, points().body, points().pelvis);
  const armLeft = () => drawBezierCurve(points().chest, points().elbowLeft, points().handLeft);
  const armRight = () => drawBezierCurve(points().chest, points().elbowRight, points().handRight);
  const legLeft = () => drawBezierCurve(points().pelvis, points().kneeLeft, points().feetLeft);
  const legRight = () => drawBezierCurve(points().pelvis, points().kneeRight, points().feetRight);

  return {
    body,
    armLeft,
    armRight,
    legLeft,
    legRight,
  };
}
