import { VIEWBOX_WIDTH } from "../constants.js";
import type { Point, Stickman, StickmanConfiguration, StickmanMovementDefinitionV1, StickmanPoints } from "../model.js";
import { buildPoint, generateIntermediatePoints, getCircleBottom, movePoint } from "./geometry.utils.js";

export function buildStickman(
  configuration: StickmanConfiguration = { bodyHeight: 20, headRadius: 10, legHeight: 20, lineWidth: 2 },
  points?: StickmanPoints
): Stickman {
  return {
    configuration,
    points: points ?? buildStickmanPoints(configuration),
  };
}

function buildStickmanPoints(conf: StickmanConfiguration): StickmanPoints {
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

function moveAllPoint(points: StickmanPoints, offset: Point): StickmanPoints {
  return Object.entries(points).reduce(
    (acc, [key, point]) => {
      acc[key] = movePoint(acc[key], offset);
      return acc;
    },
    { ...points }
  );
}

// export function* generateStickmans(definition: StickmanMovementDefinitionV1): Generator<Stickman> {
//   let current = definition.movements[0];
//   const stickman = buildStickman(definition.configuration, current);
//   yield stickman;
//   let i = 1;
//   for (const points of definition.movements.slice(1)) {
//     current = { ...current, ...points };
//     yield buildStickman(definition.configuration, moveAllPoint(current, [i * VIEWBOX_WIDTH, 0]));
//     i++;
//   }
// }

export function* generateStickmans(definition: StickmanMovementDefinitionV1): Generator<Stickman> {
  let current = definition.movements[0];

  const stickman = buildStickman(definition.configuration, current);
  yield stickman;

  let i = 1;

  for (const points of definition.movements.slice(1)) {
    type GeneratorMap = Partial<Record<keyof Stickman, Generator<Point>>>;

    const generators = Object.keys(points).reduce<GeneratorMap>((acc, key: keyof StickmanPoints) => {
      acc[key] = generateIntermediatePoints(current[key], points[key], 5);
      return acc;
    }, {});

    for (let index = 0; index < 5; index++) {
      const newPoints: StickmanPoints = { ...current };

      for (const [key, point] of Object.entries(generators)) {
        newPoints[key] = point.next().value;
      }

      yield buildStickman(definition.configuration, moveAllPoint(newPoints, [i * VIEWBOX_WIDTH, 0]));

      i++;
    }

    current = { ...current, ...points };

    // yield buildStickman(definition.configuration, moveAllPoint(current, [i * VIEWBOX_WIDTH, 0]));

    // i++;
  }
}
