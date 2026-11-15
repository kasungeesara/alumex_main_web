import type Lenis from "lenis";

let scroller: Lenis | null = null;
let locked = false;

export function registerScroller(instance: Lenis | null) {
  scroller = instance;
  if (locked) scroller?.stop();
}

export function setScrollLocked(value: boolean) {
  locked = value;
  if (locked) scroller?.stop();
  else scroller?.start();
}

export function scrollPageTo(target: number | HTMLElement, options: { immediate?: boolean; offset?: number } = {}) {
  if (scroller) {
    scroller.scrollTo(target, { offset: options.offset ?? -32, immediate: options.immediate });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  const immediate = options.immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, top + (options.offset ?? -32)), behavior: immediate ? "instant" : "smooth" });
}
