/**
 * @param {SVGPathElement} el
 * @param {import("./model").Point} point1
 * @param {import("./model").Point} point2
 * @param {import("./model").Point} point3
 */
function drawBezierCurve(el, point1, point2, point3) {
  const path = `M ${point1[0]} ${point1[1]} C ${point1[0]} ${point1[1]}, ${point2[0]} ${point2[1]}, ${point3[0]} ${point3[1]}`;

  el.setAttributeNS(null, "d", path);
}

export const SVG_NS = "http://www.w3.org/2000/svg";

export function createSVGElement() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "100");
  svg.setAttribute("width", "100");
  svg.setAttribute("viewBox", "0 0 100 100");

  return svg;
}

/**
 * @param {SVGElement} svg
 * @param {string} id
 * @param {string} lineWidth
 * @returns {SVGPathElement}
 */
function getOrCreatePath(svg, id, lineWidth) {
  if (!svg) throw Error();
  let el = svg.querySelector(`#${id}`);
  // @ts-ignore
  if (el) return el;

  el = document.createElementNS(SVG_NS, "path");
  el.setAttributeNS(null, "stroke", "black");
  el.setAttributeNS(null, "stroke-width", lineWidth);
  el.setAttributeNS(null, "fill", "transparent");
  el.id = id;
  svg.append(el);
  // @ts-ignore
  return el;
}

/**
 * @param {import('./stickman.mjs').Stickman} stickman
 * @param {SVGElement} [svg]
 */
export function drawStickman(stickman, svg = undefined) {
  if (!svg) svg = createSVGElement();

  const lineWidth = stickman.configuration.lineWidth.toString();

  /** @type {SVGCircleElement | null} */
  let head = svg.querySelector("#head");

  if (!head) {
    head = document.createElementNS(SVG_NS, "circle");
    head.setAttributeNS(null, "stroke", "black");
    head.setAttributeNS(null, "stroke-width", lineWidth);
    head.setAttributeNS(null, "r", stickman.configuration.headRadius.toString());
    head.setAttributeNS(null, "fill", "white");
    head.id = "head";
    svg.append(head);
  }

  head.setAttributeNS(null, "cx", stickman.points.head[0].toString());
  head.setAttributeNS(null, "cy", stickman.points.head[1].toString());

  const body = getOrCreatePath(svg, "body", lineWidth);
  drawBezierCurve(body, stickman.points.chest, stickman.points.body, stickman.points.pelvis);

  const armLeft = getOrCreatePath(svg, "armLeft", lineWidth);
  drawBezierCurve(armLeft, stickman.points.chest, stickman.points.elbowLeft, stickman.points.handLeft);

  const armRight = getOrCreatePath(svg, "armRight", lineWidth);
  drawBezierCurve(armRight, stickman.points.chest, stickman.points.elbowRight, stickman.points.handRight);

  const legLeft = getOrCreatePath(svg, "legLeft", lineWidth);
  drawBezierCurve(legLeft, stickman.points.pelvis, stickman.points.kneeLeft, stickman.points.feetLeft);

  const legRight = getOrCreatePath(svg, "legRight", lineWidth);
  drawBezierCurve(legRight, stickman.points.pelvis, stickman.points.kneeRight, stickman.points.feetRight);

  return svg;
}

/**
 * @param {import('./stickman.mjs').Stickman} stickman
 * @param {SVGElement} [svg]
 */
export function animate(stickman, ms = 200, svg = undefined) {
  if (!svg) svg = createSVGElement();
  drawStickman(stickman, svg);
  stickman.tick();
  setTimeout(() => requestAnimationFrame(() => animate(stickman, ms, svg)), ms);
}
