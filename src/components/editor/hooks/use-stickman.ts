import type { Signal } from "solid-js";
import { createSignal } from "solid-js";
import { usePersistentState } from "../../../hooks/use-persistent-state";
import { Stickman, StickmanPoints } from "../../../model";
import { buildStickman } from "../../../utils/stickman.utils";

export function useStickman(): { stickman: Signal<Stickman>; updateStickmanPoints: (points: StickmanPoints) => void } {
  const [stickman, setStickman] = createSignal(buildStickman());

  usePersistentState("editor__stickman", [stickman, setStickman]);

  const updateStickmanPoints = (points: StickmanPoints) => setStickman(buildStickman(stickman().configuration, points));

  return {
    stickman: [stickman, setStickman],
    updateStickmanPoints,
  };
}
