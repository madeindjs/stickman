import type { Signal } from "solid-js";
import { createEffect, createSignal, on } from "solid-js";
import { usePersistentState } from "../../../hooks/use-persistent-state";
import { Stickman, StickmanPoints } from "../../../model";
import { buildStickman } from "../../../utils/stickman.utils";

export function useSnapshots([stickman, setStickman]: Signal<Stickman>): {
  snapshots: Signal<StickmanPoints[]>;
  selected: Signal<number | undefined>;
  updateSelectedSnapshot: (points: StickmanPoints) => void;
} {
  const [snapshots, setSnapshots] = createSignal<StickmanPoints[]>([]);
  const [snapshotSelectedIndex, setSnapshotSelectedIndex] = createSignal<number | undefined>();

  usePersistentState("editor__snapshots", [snapshots, setSnapshots]);

  // update stickman if selected snapshot change
  createEffect(
    on(
      () => snapshotSelectedIndex(),
      (value) => {
        console.log(value);
        if (value === undefined) return;
        setStickman(buildStickman(stickman().configuration, snapshots()[value]));
      }
    )
  );

  function updateSelectedSnapshot(points: StickmanPoints) {
    if (snapshotSelectedIndex() !== undefined) {
      const snaps = [...snapshots()];
      snaps[snapshotSelectedIndex()] = points;
      setSnapshots(snaps);
    }
  }

  return {
    snapshots: [snapshots, setSnapshots],
    selected: [snapshotSelectedIndex, setSnapshotSelectedIndex],
    updateSelectedSnapshot,
  };
}
