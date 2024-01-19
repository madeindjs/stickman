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

export function* getPointsTo(from, to) {}
