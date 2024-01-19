/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {import("./model").Point} point1
 * @param {import("./model").Point} point2
 * @param {import("./model").Point} point3
 */
export function drawBezierCurve(ctx, point1, point2, point3) {
  ctx.beginPath();
  ctx.moveTo(...point1);
  ctx.bezierCurveTo(...point1, ...point2, ...point3);
  ctx.stroke();
  ctx.closePath();
}
