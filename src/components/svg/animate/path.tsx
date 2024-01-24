import type { Accessor } from "solid-js";

type Props = { paths: Accessor<string[]>; dur: Accessor<string>; loop: Accessor<boolean> };

export default function AnimatePath({ paths, dur, loop }: Props) {
  const from = () => paths()[0];
  const values = () => (loop() ? [...paths(), from()] : paths()).join(";");

  return <animate attributeName="d" values={values()} dur={dur().toString()} repeatCount="indefinite" />;
}
