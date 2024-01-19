/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {import("./model").Point} point1
 * @param {import("./model").Point} point2
 * @param {import("./model").Point} point3
 */
function drawBezierCurve(ctx, point1, point2, point3) {
  ctx.beginPath();
  ctx.moveTo(...point1);
  ctx.bezierCurveTo(...point1, ...point2, ...point3);
  ctx.stroke();
  ctx.closePath();
}

/**
 * @param {import('./stickman.mjs').Stickman} stickman
 */
export function drawStickman(stickman, canvas = document.createElement("canvas")) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("Cannot get canvas context");

  ctx.clearRect(0, 0, 100, 100);
  debug(canvas);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";

  // head
  ctx.beginPath();
  ctx.arc(...stickman.points.head, stickman.configuration.headRadius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();
  // body
  drawBezierCurve(ctx, stickman.points.chest, stickman.points.body, stickman.points.pelvis);
  // arm left
  drawBezierCurve(ctx, stickman.points.chest, stickman.points.elbowLeft, stickman.points.handLeft);
  // arm right
  drawBezierCurve(ctx, stickman.points.chest, stickman.points.elbowRight, stickman.points.handRight);
  // leg left
  drawBezierCurve(ctx, stickman.points.pelvis, stickman.points.kneeLeft, stickman.points.feetLeft);
  // leg right
  drawBezierCurve(ctx, stickman.points.pelvis, stickman.points.kneeRight, stickman.points.feetRight);
}

/**
 * @param {import('./stickman.mjs').Stickman} stickman
 */
export function animate(stickman, ms = 200, canvas = document.createElement("canvas")) {
  drawStickman(stickman, canvas);
  debug(canvas);
  stickman.tick();
  setTimeout(() => requestAnimationFrame(() => animate(stickman, ms, canvas)), ms);
}

function debug(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "grey";

  const p = new Array(10).fill("").map((_, i) => i);

  for (const x of p) {
    ctx.beginPath();
    ctx.moveTo(x * 10, 0);
    ctx.lineTo(x * 10, 100);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, x * 10);
    ctx.lineTo(100, x * 10);
    ctx.stroke();
    ctx.closePath();
  }
}
