import type { Accessor } from "solid-js";
import type { Point } from "../../../model";

type Props = { paths: Accessor<Point[]>; dur: Accessor<string>; loop: Accessor<boolean> };

export default function AnimateCircle({ paths, dur, loop }: Props) {
  const from = () => paths()[0];
  const values = () => (loop() ? [...paths(), from()] : paths());

  const getValues = (d: 0 | 1) =>
    values()
      .map((p) => p[d])
      .join(";");

  return (
    <>
      <animate attributeName="cx" values={getValues(0)} dur={dur().toString()} repeatCount="indefinite" />
      <animate attributeName="cy" values={getValues(1)} repeatCount="indefinite" />
    </>
  );
}
