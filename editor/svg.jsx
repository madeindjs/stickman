import { Stickman } from "../stickman.mjs";

/**
 * @param {import("../model").Point} point1
 * @param {import("../model").Point} point2
 * @param {import("../model").Point} point3
 */
function drawBezierCurve(point1, point2, point3) {
  return `M ${point1[0]} ${point1[1]} C ${point1[0]} ${point1[1]}, ${point2[0]} ${point2[1]}, ${point3[0]} ${point3[1]}`;
}

/**
 * @typedef Props
 * @property {import('solid-js').Accessor<Stickman>} stickman
 * @property {import('solid-js').Accessor<import('solid-js').JSX.Element | import('solid-js').JSX.Element>} [children]
 * @property {number} [height]
 * @property {number} [width]
 *
 * @param {Props} param0
 * @returns
 */
export default function EditorSvg({ stickman, width = 100, height = 100, children }) {
  const points = () => stickman().points;
  const conf = () => stickman().configuration;

  const body = () => drawBezierCurve(points().chest, points().body, points().pelvis);
  const armLeft = () => drawBezierCurve(points().chest, points().elbowLeft, points().handLeft);
  const armRight = () => drawBezierCurve(points().chest, points().elbowRight, points().handRight);
  const legLeft = () => drawBezierCurve(points().pelvis, points().kneeLeft, points().feetLeft);
  const legRight = () => drawBezierCurve(points().pelvis, points().kneeRight, points().feetRight);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 100 100"
      stroke="black"
      stroke-width={conf().lineWidth}
      fill="transparent"
    >
      <circle r={conf().headRadius} cx={points().head[0]} cy={points().head[1]} fill="white" />
      <path d={body()} />
      <path d={armLeft()} />
      <path d={armRight()} />
      <path d={legLeft()} />
      <path d={legRight()} />
      {children()}
    </svg>
  );
}
