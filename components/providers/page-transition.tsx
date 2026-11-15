"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const [cover, setCover] = useState(false);
  const navigating = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const timer = setTimeout(() => { setCover(false); navigating.current = false; }, 100);
    return () => clearTimeout(timer);
  }, [path]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const link = event.composedPath().find(node => node instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || !['http:', 'https:'].includes(url.protocol)) return;
      event.preventDefault();
      if (navigating.current) return;
      navigating.current = true;
      setCover(true);
      timers.current.push(setTimeout(() => router.push(url.pathname + url.search + url.hash), 650));
      timers.current.push(setTimeout(() => { setCover(false); navigating.current = false; }, 8000));
    };
    document.addEventListener('click', click, true);
    return () => { document.removeEventListener('click', click, true); timers.current.forEach(clearTimeout); };
  }, [router]);
  return <div className={`era-transition-veil ${cover ? 'is-covering' : ''}`} aria-hidden="true"><span>ALUMEX</span><i>Shaping possibilities</i></div>;
}
