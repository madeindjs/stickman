import { buildPoint, getCircleBottom, movePoint } from "./geometry.utils.mjs";

/**
 *
 * @param {import("./model").StickmanPoints} points
 * @param {import("./model").MovementInstructions} instructions
 * @returns {import("./model").MovementGenerator}
 */
function* getMovementsFromInstruction(points, instructions) {
  let current = { ...points };

  const maxTick = Math.max(...Object.values(instructions).map((v) => v.length));

  while (true) {
    let i = 0;
    const parts = Object.keys(instructions);

    while (i < maxTick) {
      for (const part of parts) {
        if (instructions[part]?.[i] === undefined) continue;
        current[part] = movePoint(points[part], instructions[part][i]);
      }

      yield current;
      i++;
    }

    i--;

    while (i >= 0) {
      for (const part of parts) {
        if (instructions[part]?.[i] === undefined) continue;
        current[part] = movePoint(points[part], instructions[part][i]);
      }

      yield current;
      i--;
    }
  }
}

/**
 * Generate breathing movement
 * @param {import("./model").StickmanPoints} points
 * @returns {import("./model").MovementGenerator}
 */
export function* getBreathingMovement(points) {
  /** @type {import("./model").Point[]} */
  const verticalMoves = [
    [0, -1],
    [0, 0],
    [0, 1],
  ];

  /** @type {import("./model").Point[]} */
  const horizontalMoves = [
    [-1, 0],
    [0, 0],
    [1, 0],
  ];

  yield* getMovementsFromInstruction(points, {
    head: verticalMoves,
    handLeft: verticalMoves,
    handRight: verticalMoves,
    elbowLeft: horizontalMoves,
    elbowRight: horizontalMoves,
  });
}

/**
 * Generate breathing movement
 * @param {import("./model").StickmanPoints} points
 * @returns {import("./model").MovementGenerator}
 */
export function* getWavingMovement(points) {
  yield* getMovementsFromInstruction(points, {
    handRight: [
      [1, 0],
      [2, -1],
      [3, -4],
      [3, -6],
      [3, -10],
      [4, -12],
      [4, -15],
      [4, -20],
      [4, -25],
      [5, -27],
      [4, -27],
      [5, -27],
    ],
  });
}

/**
 * Generate breathing movement
 * @param {import("./model").StickmanPoints} points
 * @returns {import("./model").MovementGenerator}
 */
export function* getWalkingMovement(points) {
  yield* getMovementsFromInstruction(points, {
    feetLeft: [
      [0, -1],
      [0, -2],
      [0, -2],
    ],
    kneeLeft: [
      [2, 0],
      [5, 0],
    ],
    pelvis: [
      [1, 0],
      [2, 0],
    ],
    handLeft: [[2, 0]],
    handRight: [[2, 0]],
    elbowRight: [[-1, 0]],
    chest: [[1, 0]],
    head: [[2, 0]],
  });
}

/**
 * @param {Record<'headRadius' | 'lineWidth' | 'bodyHeight' | 'legHeight', number>} conf
 * @returns {import("./model").StickmanPoints}
 */
export function buildInitialPoints(conf) {
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
