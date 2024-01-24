import type { Setter, Signal } from "solid-js";
import { createEffect, createSignal, on } from "solid-js";
import type { StickmanPoints } from "../../../model";

export function useSnapshots(setPoints: Setter<StickmanPoints>): {
  snapshots: Signal<StickmanPoints[]>;
  selected: Signal<number | undefined>;
  updateSelectedSnapshot: (points: StickmanPoints) => void;
} {
  const [snapshots, setSnapshots] = createSignal<StickmanPoints[]>([]);
  const [snapshotSelectedIndex, setSnapshotSelectedIndex] = createSignal<number | undefined>();

  // usePersistentState("editor__snapshots", [snapshots, setSnapshots]);

  // update stickman if selected snapshot change
  createEffect(
    on(
      () => snapshotSelectedIndex(),
      (value) => value !== undefined && setPoints(snapshots()[value])
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
