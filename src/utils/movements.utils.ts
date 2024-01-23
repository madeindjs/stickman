import type { StickmanConfiguration, StickmanMovementDefinitionV1, StickmanPoints } from "../model";
import { isSamePoint, roundPoint } from "./geometry.utils.js";

export function generateStickmanMovementDefinitionV1(
  configuration: StickmanConfiguration,
  snapshots: StickmanPoints[],
  animation: StickmanMovementDefinitionV1["animation"],
  opts = { round: 2 }
): StickmanMovementDefinitionV1 {
  let previous = snapshots[0];
  const def: StickmanMovementDefinitionV1 = { version: 1, configuration, movements: [snapshots[0]], animation };

  for (const points of snapshots.slice(1)) {
    const part = Object.entries(points).reduce<Partial<StickmanPoints>>((acc, [key, point]) => {
      if (!isSamePoint(previous[key], point)) {
        acc[key] = roundPoint(point, opts.round);
      }
      return acc;
    }, {});

    previous = points;

    def.movements.push(part);
  }

  return def;
}
