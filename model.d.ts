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

export type MovementGenerator = Generator<StickmanPoints>;

export type MovementInstructions = Partial<Record<keyof StickmanPoints, Generator<Point>>>;
