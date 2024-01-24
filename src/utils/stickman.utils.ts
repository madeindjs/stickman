import type { StickmanConfiguration, StickmanDefinitionV1, StickmanPoints } from "../model.js";
import { buildPoint, getCircleBottom, movePoint } from "./geometry.utils.js";

export function buildStickmanConfiguration() {
  return { bodyHeight: 20, headRadius: 10, legHeight: 20, lineWidth: 2 };
}

export function buildStickmanPoints(conf: StickmanConfiguration): StickmanPoints {
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

export function* generateStickmansPoints(definition: StickmanDefinitionV1): Generator<StickmanPoints> {
  let current = definition.movements[0];
  yield current;
  let i = 1;
  for (const points of definition.movements.slice(1)) {
    current = { ...current, ...points };
    yield current;
    i++;
  }
}
