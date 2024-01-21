import type { Accessor } from "solid-js";
import { generateStickmanMovementDefinitionV1 } from "../movements.mjs";
import type { Stickman } from "../stickman.mjs";

type Props = {
  snapshots: Accessor<Stickman[]>;
};

export default function EditorExport({ snapshots }: Props) {
  const value = () =>
    snapshots().length > 0
      ? JSON.stringify(generateStickmanMovementDefinitionV1(snapshots()), undefined, 2)
      : undefined;

  return (
    <details>
      <summary>Export</summary>
      <pre>{value()}</pre>
    </details>
  );
}
