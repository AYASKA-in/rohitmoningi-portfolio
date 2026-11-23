"use client";
import { useSyncExternalStore } from "react";

const preference = "(prefers-reduced-motion: reduce), (forced-colors: active)";
function subscribe(notify: () => void) {
  const media = window.matchMedia(preference);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

/** The first hydration matches the visible server-rendered content. */
export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, () => !window.matchMedia(preference).matches, () => false);
}
