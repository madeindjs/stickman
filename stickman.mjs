import { buildPoint, getCircleBottom, movePoint } from "./geometry.utils.mjs";
import { getBreathingMovement, getWalkingMovement, getWavingMovement } from "./movements.mjs";

// npm install terminal-canvas

export class Stickman {
  /** @type {import("./model").StickmanConfiguration} */
  #configuration;
  /** @type {import("./model").StickmanPoints} */
  #points;
  /** @type {import("./model").MovementGenerator} */
  #movementGenerator;

  #action = "stay";

  /**
   *
   * @param {import("./model").StickmanConfiguration} configuration
   */
  constructor(configuration = { bodyHeight: 20, headRadius: 10, legHeight: 20, lineWidth: 2 }) {
    this.#configuration = configuration;

    this.#points = buildStickmanPoints(configuration);

    this.#movementGenerator = getWavingMovement(this.#points);
    this.#movementGenerator = getBreathingMovement(this.#points);
    this.#movementGenerator = getWalkingMovement(this.#points);
  }

  get points() {
    return this.#points;
  }

  get configuration() {
    return this.#configuration;
  }

  setMovement() {}

  tick() {
    this.#points = this.#movementGenerator.next().value;
  }

  sayHi() {}
}

/**
 * @param {import("./model").StickmanConfiguration} conf
 * @returns {import("./model").StickmanPoints}
 */
export function buildStickmanPoints(conf) {
  const head = buildPoint(20, 20);
  const neck = getCircleBottom(...head, conf.headRadius, conf.lineWidth);
  const chest = buildPoint(neck[0], head[1] + conf.headRadius);

  const body = movePoint(chest, [-2, conf.bodyHeight / 2]);
  const pelvis = movePoint(chest, [0, conf.bodyHeight]);

  const elbowLeft = movePoint(chest, [-8, conf.bodyHeight / 2]);
  const handLeft = movePoint(chest, [-10, conf.bodyHeight]);

  const elbowRight = movePoint(chest, [8, conf.bodyHeight / 2]);
  const handRight = movePoint(chest, [10, conf.bodyHeight]);

  const kneeLeft = movePoint(pelvis, [-8, conf.legHeight / 2]);
  const feetLeft = movePoint(pelvis, [-8, conf.legHeight]);

  const kneeRight = movePoint(pelvis, [8, conf.legHeight / 2]);
  const feetRight = movePoint(pelvis, [8, conf.legHeight]);

  return {
    head,
    neck,
    chest,
    body,
    pelvis,
    kneeRight,
    elbowLeft,
    kneeLeft,
    handLeft,
    elbowRight,
    handRight,
    feetLeft,
    feetRight,
  };
}
