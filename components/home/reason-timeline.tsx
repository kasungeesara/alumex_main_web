"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ReasonTimeline({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const bounds = grid.getBoundingClientRect();
      const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (viewport * .7 - bounds.top) / (viewport * .1 + bounds.height)));
      grid.style.setProperty("--reason-progress", String(progress));
      grid.querySelectorAll<HTMLElement>("[data-reason-item]").forEach((row, index) => {
        const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (viewport * .82 - row.getBoundingClientRect().top) / (viewport * .4)));
        row.style.opacity = String(.28 + progress * .72);
        row.style.transform = `translateX(${(1 - progress) * (index % 2 === 0 ? -18 : 18)}px)`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(grid);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return <div className="reason-process mt-16 [&_article]:grid [&_article]:grid-cols-[2fr_4fr_6fr] [&_article]:items-start [&_article]:gap-8 [&_article]:py-10 [&_article]:[border-top:1px_solid_#dce3d9] [&_h3]:mt-0 [&_h3]:mr-0 [&_h3]:mb-0 [&_h3]:ml-0 [&_h3]:text-[clamp(24px,_2.5vw,_36px)] [&_h3]:font-medium [&_h3]:leading-[1.2] [&_h3]:tracking-[-.035em] [&_p]:mt-0 [&_p]:mr-0 [&_p]:mb-0 [&_p]:ml-0 [&_p]:max-w-144 [&_p]:text-[#606860] [&_p]:text-[16px] [&_p]:leading-[1.8] max-[1000px]:[&_article]:grid-cols-[1fr_3fr_4fr] max-[1000px]:[&_article]:gap-6 max-[600px]:mt-10 max-[600px]:[&_article]:grid-cols-[1fr] max-[600px]:[&_article]:gap-4 max-[600px]:[&_article]:py-8 max-[600px]:[&_p]:text-[14px] motion-reduce:[&_article]:opacity-100! motion-reduce:[&_article]:[transform:none]! relative" ref={gridRef}>
    <span className="reason-process-track absolute w-0.25 [&_span]:h-full [&_span]:w-full [&>span]:[transform:scaleY(var(--reason-progress,_0))] max-[600px]:hidden motion-reduce:[&>span]:[transform:none] top-0 right-auto bottom-0 left-0 bg-[#dce3d9]" aria-hidden="true"><span className="block bg-[#63b94b] origin-top" /></span>
    <div className="reason-process-rows pl-10 max-[600px]:pl-0">{children}</div>
  </div>;
}
