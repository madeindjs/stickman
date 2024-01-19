import { drawBezierCurve } from "./canvas.utils.mjs";
import {
  buildInitialPoints,
  getBreathingMovement,
  getWalkingMovement,
  getWavingMovement,
} from "./stickman-points.utils.mjs";

// npm install terminal-canvas

export class Stickman {
  /** @type {HTMLCanvasElement} */
  #canvas;
  #headRadius = 10;
  #bodyHeight = 20;
  #legHeight = 20;

  /** @type {import("./model").StickmanPoints} */
  #points;

  /** @type {import("./model").MovementGenerator} */
  #movementGenerator;

  #action = "stay";

  constructor() {
    this.#canvas = document.createElement("canvas");
    document.body.append(this.#canvas);

    this.#points = buildInitialPoints({
      bodyHeight: this.#bodyHeight,
      headRadius: this.#headRadius,
      legHeight: this.#legHeight,
      lineWidth: 2,
    });

    this.#movementGenerator = getWavingMovement(this.#points);
    this.#movementGenerator = getBreathingMovement(this.#points);
    this.#movementGenerator = getWalkingMovement(this.#points);
  }

  render() {
    requestAnimationFrame(() => {
      this.#render();
      this.#tick();

      setTimeout(() => this.render(), 200);
    });
  }

  #render() {
    const ctx = this.#canvas.getContext("2d");
    if (!ctx) throw Error("Cannot get canvas context");

    ctx.clearRect(0, 0, 100, 100);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // head
    ctx.beginPath();
    ctx.arc(...this.#points.head, this.#headRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    // body
    drawBezierCurve(ctx, this.#points.chest, this.#points.body, this.#points.pelvis);
    // arm left
    drawBezierCurve(ctx, this.#points.chest, this.#points.elbowLeft, this.#points.handLeft);
    // arm right
    drawBezierCurve(ctx, this.#points.chest, this.#points.elbowRight, this.#points.handRight);
    // leg left
    drawBezierCurve(ctx, this.#points.pelvis, this.#points.kneeLeft, this.#points.feetLeft);
    // leg right
    drawBezierCurve(ctx, this.#points.pelvis, this.#points.kneeRight, this.#points.feetRight);
  }

  #tick() {
    this.#points = this.#movementGenerator.next().value;
  }

  sayHi() {}
}
