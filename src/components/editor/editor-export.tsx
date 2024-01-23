import type { Accessor } from "solid-js";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard.js";
import { StickmanConfiguration, StickmanPoints } from "../../model.js";
import { generateStickmanMovementDefinitionV1 } from "../../utils/movements.utils.js";

type Props = {
  configuration: Accessor<StickmanConfiguration>;
  snapshots: Accessor<StickmanPoints[]>;
};

export default function EditorExport({ snapshots, configuration }: Props) {
  const value = () =>
    snapshots().length > 0
      ? JSON.stringify(
          generateStickmanMovementDefinitionV1(configuration(), snapshots(), { timeBetweenFrames: 1 }),
          undefined,
          2
        )
      : "";

  const copy = useCopyToClipboard(value);

  return (
    <button class="btn btn-primary" onclick={copy}>
      Export configuration (clipboard)
    </button>
  );
}
