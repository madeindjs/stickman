import { movePoint } from "./geometry.utils.mjs";

/**
 *
 * @param {import("./model").Point} point1
 * @param {import("./model").Point} point2
 * @param {number} numberOfPoints
 * @returns {Generator<import("./model").Point>}
 */
function* generateIntermediatePoints(point1, point2, numberOfPoints) {
  for (let i = 0; i <= numberOfPoints; i++) {
    const t = i / numberOfPoints;
    const x = lerp(point1[0], point2[0], t);
    const y = lerp(point1[1], point2[1], t);
    yield [x, y];
  }
}

/**
 * @typedef {[point: import("./model").Point, count: number]} Vector
 * @param {import("./model").Point} from
 * @param  {...Vector} vectors
 */
function* generatePath(from, ...vectors) {
  let current = from;

  for (const [next, count] of vectors) {
    yield* generateIntermediatePoints(current, next, count);
    current = next;
  }
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {Generator<T>}
 */
function* iteratorFromArray(arr) {
  for (const item of arr) yield item;
}

/**
 * @template T
 * @param  {...Generator<T>} iterators
 * @returns {Generator<T>}
 */
function* combine(...iterators) {
  for (const iter of iterators) yield* iter;
}

/**
 * @param {import("./model").StickmanPoints} points
 * @param {import("./model").MovementInstructions} instructions
 * @returns {import("./model").MovementGenerator}
 */
function* getMovementsFromInstruction(points, instructions) {
  let current = { ...points };

  while (true) {
    let didSomething = false;

    for (const [key, iter] of Object.entries(instructions)) {
      const { done, value } = iter.next();

      if (done || !value) continue;

      current[key] = movePoint(points[key], value);
      didSomething = true;
    }

    if (!didSomething) return;

    yield current;
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
    head: iteratorFromArray(verticalMoves),
    handLeft: iteratorFromArray(verticalMoves),
    handRight: iteratorFromArray(verticalMoves),
    elbowLeft: iteratorFromArray(horizontalMoves),
    elbowRight: iteratorFromArray(horizontalMoves),
  });
}

/**
 * Generate breathing movement
 * @param {import("./model").StickmanPoints} points
 * @returns {import("./model").MovementGenerator}
 */
export function* getWavingMovement(points) {
  yield* getMovementsFromInstruction(points, {
    handRight: iteratorFromArray([
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
    ]),
  });
}

/**
 * @param {Array<Vector>} elements
 * @param {number} count
 * @returns {Array<Vector>}
 */
function repeat(elements, count) {
  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(...elements);
  }
  return res;
}

/**
 * Generate breathing movement
 * @param {import("./model").StickmanPoints} points
 * @returns {import("./model").MovementGenerator}
 */
export function* getWalkingMovement(points) {
  yield* getMovementsFromInstruction(points, {
    feetLeft: generatePath(
      [0, 0],
      ...repeat(
        [
          [[10, -5], 5],
          [[16, 0], 5],
          [[0, 0], 10],
        ],
        5
      )
    ),
    kneeLeft: generatePath(
      [0, 0],
      ...repeat(
        [
          [[10, -5], 5],
          [[15, 0], 5],
          [[0, 0], 10],
        ],
        5
      )
    ),
    feetRight: generatePath(
      [0, 0],
      ...repeat(
        [
          [[-16, 0], 10],
          [[-6, -5], 5],
          [[0, 0], 5],
        ],
        5
      )
    ),
    kneeRight: generatePath(
      [0, 0],
      ...repeat(
        [
          [[-15, 0], 10],
          [[-5, 0], 5],
          [[0, 0], 5],
        ],
        5
      )
    ),
    pelvis: generatePath(
      [0, 0],
      ...repeat(
        [
          [[1, 0], 7],
          [[-1, 0], 7],
          [[0, 0], 6],
        ],
        5
      )
    ),
    chest: generatePath(
      [0, 0],
      ...repeat(
        [
          [[1, 1], 10],
          [[0, 0], 10],
        ],
        5
      )
    ),
    head: generatePath(
      [0, 0],
      ...repeat(
        [
          [[1, 1], 10],
          [[0, 0], 10],
        ],
        5
      )
    ),
    elbowLeft: generatePath([0, 0], [[-2, -2], 10], [[0, 0], 10]),
    handLeft: generatePath(
      [0, 0],
      [[10, -3], 10],
      ...repeat(
        [
          [[13, -6], 10],
          [[10, -3], 10],
        ],
        4
      ),
      [[0, 0], 10]
    ),

    elbowRight: generatePath([0, 0], [[-10, 2], 80], [[0, 0], 10]),
    handRight: generatePath(
      [0, 0],
      [[-2, -3], 10],
      ...repeat(
        [
          [[-2, -3], 10],
          [[-5, -6], 10],
        ],
        4
      ),
      [[0, 0], 10]
    ),
  });
}
