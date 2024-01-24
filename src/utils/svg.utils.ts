import type { Point, StickmanPoints } from "../model";

export function drawBezierCurve(point1: Point, point2: Point, point3: Point) {
  return `M ${point1[0]} ${point1[1]} C ${point1[0]} ${point1[1]}, ${point2[0]} ${point2[1]}, ${point3[0]} ${point3[1]}`;
}

export function getStickmanPaths(points: StickmanPoints) {
  const body = () => drawBezierCurve(points.chest, points.body, points.pelvis);
  const armLeft = () => drawBezierCurve(points.chest, points.elbowLeft, points.handLeft);
  const armRight = () => drawBezierCurve(points.chest, points.elbowRight, points.handRight);
  const legLeft = () => drawBezierCurve(points.pelvis, points.kneeLeft, points.feetLeft);
  const legRight = () => drawBezierCurve(points.pelvis, points.kneeRight, points.feetRight);

  return {
    body,
    armLeft,
    armRight,
    legLeft,
    legRight,
  };
}

export function downloadSVG(svg: SVGSVGElement, filename = "stickman.svg") {
  const svgData = svg.outerHTML;
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
