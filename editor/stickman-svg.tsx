import type { Accessor } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import type { Point } from "../model";
import type { Stickman } from "../stickman.mjs";

function drawBezierCurve(point1: Point, point2: Point, point3: Point) {
  return `M ${point1[0]} ${point1[1]} C ${point1[0]} ${point1[1]}, ${point2[0]} ${point2[1]}, ${point3[0]} ${point3[1]}`;
}

type Props = {
  stickman: Accessor<Stickman>;
  children?: JSX.Element;
  height?: number;
  width?: number;
  ref?: SVGSVGElement;
};

export default function StickmanSVG({ stickman, width = 100, height = 100, children, ref }: Props) {
  const points = () => stickman().points;
  const conf = () => stickman().configuration;

  const body = () => drawBezierCurve(points().chest, points().body, points().pelvis);
  const armLeft = () => drawBezierCurve(points().chest, points().elbowLeft, points().handLeft);
  const armRight = () => drawBezierCurve(points().chest, points().elbowRight, points().handRight);
  const legLeft = () => drawBezierCurve(points().pelvis, points().kneeLeft, points().feetLeft);
  const legRight = () => drawBezierCurve(points().pelvis, points().kneeRight, points().feetRight);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 100 100"
      stroke="black"
      stroke-width={conf().lineWidth}
      fill="transparent"
      style="border: 1px solid black"
    >
      <circle r={conf().headRadius} cx={points().head[0]} cy={points().head[1]} fill="white" />
      <path d={body()} />
      <path d={armLeft()} />
      <path d={armRight()} />
      <path d={legLeft()} />
      <path d={legRight()} />
      {children}
    </svg>
  );
}
