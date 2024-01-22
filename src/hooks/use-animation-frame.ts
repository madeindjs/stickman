import { createSignal, onCleanup, onMount } from "solid-js";

export function useAnimationFrame(callback: () => void, ms = 200) {
  const [running, setRunning] = createSignal(false);

  function tick() {
    if (!running()) return;

    requestAnimationFrame(() => {
      callback();
      setTimeout(tick, ms);
    });
  }

  onMount(() => {
    setRunning(true);
    tick();
  });

  onCleanup(() => {
    setRunning(false);
  });

  return () => setRunning(false);
}
