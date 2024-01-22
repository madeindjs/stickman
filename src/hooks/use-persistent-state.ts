import { createEffect, on, onMount } from "solid-js";

import type { Signal } from "solid-js";

export function usePersistentState<T>(key: string, signal: Signal<T>, transform?: (value: T) => T) {
  const [getter, setter] = signal;

  onMount(() => {
    const cache = localStorage.getItem(key);
    if (!cache) return;
    try {
      const obj = JSON.parse(cache);
      setter(transform ? transform(obj) : obj);
    } catch (err) {
      console.error(err);
      localStorage.removeItem(key);
    }
  });

  createEffect(
    on(
      () => getter(),
      (value) => localStorage.setItem(key, JSON.stringify(value))
    )
  );
}
