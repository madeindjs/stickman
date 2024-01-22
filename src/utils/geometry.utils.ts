import type { Point } from "../model";

export function getCircleBottom(cx: number, cy: number, radius: number, lineWidth: number): Point {
  const offset = radius / 2 - lineWidth * 2;
  return [cx + offset, cy + offset];
}

export function movePoint([x, y]: Point, [tx, ty]: Point): Point {
  return [x + tx, y + ty];
}

export function buildPoint(x: number, y: number): Point {
  return [x, y];
}

export function isSamePoint(a: Point, b: Point) {
  return a[0] === b[0] && a[1] === b[1];
}

export function roundPoint(a: Point, round = 2): Point {
  return [Number(a[0].toFixed(round)), Number(a[1].toFixed(round))];
}

export function* generateIntermediatePoints(point1: Point, point2: Point, numberOfPoints: number): Generator<Point> {
  for (let i = 0; i <= numberOfPoints; i++) {
    const t = i / numberOfPoints;
    const x = lerp(point1[0], point2[0], t);
    const y = lerp(point1[1], point2[1], t);
    yield [x, y];
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
