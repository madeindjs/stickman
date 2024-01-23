import type { Accessor } from "solid-js";

export function toAccessor<T extends number | string | undefined>(value: T | Accessor<T>): Accessor<T> {
  if (typeof value === "function") return value;
  return () => value;
}
