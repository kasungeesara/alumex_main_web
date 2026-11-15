"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerScroller, scrollPageTo } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const configure = () => {
      registerScroller(null);
      lenis?.destroy();
      lenis = null;
      if (preference.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
        syncTouch: false,
      });
      registerScroller(lenis);
    };
    const navigateAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.composedPath().find(node => node instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      if (!url.hash && link.getAttribute("href") !== "#") return;
      const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
      if (url.hash && !target) return;
      event.preventDefault();
      history.pushState(history.state, "", url.hash || url.pathname + url.search);
      scrollPageTo(target || 0);
    };
    configure();
    document.addEventListener("click", navigateAnchor);
    preference.addEventListener("change", configure);
    return () => {
      document.removeEventListener("click", navigateAnchor);
      preference.removeEventListener("change", configure);
      registerScroller(null);
      lenis?.destroy();
    };
  }, []);
  return null;
}
