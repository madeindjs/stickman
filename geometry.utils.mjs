/**
 *
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} lineWidth
 * @returns {import("./model").Point}
 */
export function getCircleBottom(cx, cy, radius, lineWidth) {
  const offset = radius / 2 - lineWidth * 2;
  return [cx + offset, cy + offset];
}

/**
 *
 * @param {import("./model").Point} param0
 * @param {import("./model").Point} param1
 * @returns {import("./model").Point}
 */
export function movePoint([x, y], [tx, ty]) {
  return [x + tx, y + ty];
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {import("./model").Point}
 */
export function buildPoint(x, y) {
  return [x, y];
}

/**
 * @param {import("./model").Point} a
 * @param {import("./model").Point} b
 */
export function isSamePoint(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * @param {import("./model").Point} a
 * @return {import("./model").Point}
 */
export function roundPoint(a, round = 2) {
  return [Number(a[0].toFixed(round)), Number(a[1].toFixed(round))];
}
