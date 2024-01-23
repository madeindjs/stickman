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

export type Stickman = { points: StickmanPoints; configuration: StickmanConfiguration };

export type MovementGenerator = Generator<StickmanPoints>;

export type MovementInstructions = Partial<Record<keyof StickmanPoints, Generator<Point>>>;

export type StickmanMovementDefinitionV1 = {
  version: 1;
  /**
   * Sequence of points for each elements. It's null if previous point is same.
   */
  movements: [StickmanPoints, ...Partial<StickmanPoints>[]];
  configuration: StickmanConfiguration;
  animation: {
    timeBetweenFrames: number;
  };
};

export type SVGViewbox = [x: number, y: number, width: number, height: number];
