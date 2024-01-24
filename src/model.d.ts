export type Point = [x: number, y: number];

export type StickmanPoints = {
  head: Point;
  neck: Point;
  chest: Point;
  body: Point;
  elbowLeft: Point;
  handLeft: Point;
  elbowRight: Point;
  handRight: Point;
  pelvis: Point;
  kneeLeft: Point;
  kneeRight: Point;
  feetLeft: Point;
  feetRight: Point;
};

export type StickmanConfiguration = Record<"headRadius" | "lineWidth" | "bodyHeight" | "legHeight", number>;

export type StickmanAnimation = {
  timeBetweenFrames: number;
  loop: boolean;
};

export type StickmanDefinitionV1 = {
  version: 1;
  /**
   * Sequence of points for each elements. It's null if previous point is same.
   */
  movements: StickmanPoints[];
  configuration: StickmanConfiguration;
  animation: StickmanAnimation;
};

export type SVGViewbox = [x: number, y: number, width: number, height: number];
