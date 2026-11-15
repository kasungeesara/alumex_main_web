"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "./shared";
import { ProductCard, ProductMoreCard } from "./product-card";
import { products } from "./products-data";
import { scrollPageTo } from "@/lib/scroll";

function AnimatedLine({ text, offset = 0 }: { text: string; offset?: number }) {
  let character = offset;
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          className="expertise-word text-inherit inline-block whitespace-nowrap"
          key={`${word}-${index}`}
        >
          {[...word].map((letter, i) => (
            <span
              className="expertise-letter text-inherit motion-reduce:[filter:none] motion-reduce:opacity-100 inline-block"
              aria-hidden="true"
              key={i}
              style={{ "--letter-index": character++ } as CSSProperties}
            >
              {letter}
            </span>
          ))}
          <span aria-hidden="true">&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigateRef = useRef<(direction: number) => void>(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;
    const desktop = window.matchMedia("(min-width: 1200px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = 0;
    let velocity = 0;
    let target = 0;
    let lastTime = 0;
    let disposed = false;

    // Same scroll spring settings as the reference: stiffness 229, damping 60.
    const tick = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.032) : 1 / 60;
      lastTime = time;
      const step = dt / 4;
      for (let i = 0; i < 4; i++) {
        velocity += ((target - current) * 229 - velocity * 60) * step;
        current += velocity * step;
      }
      const pixelRatio = window.devicePixelRatio || 1;
      track.style.transform = `translate3d(${-Math.round(current * pixelRatio) / pixelRatio}px, 0, 0)`;
      if (
        !disposed &&
        (Math.abs(target - current) > 0.05 || Math.abs(velocity) > 0.05)
      ) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };
    const update = () => {
      const canPin = desktop.matches && !reducedMotion.matches;
      // Keep the full composition visible while preserving horizontal scrolling.
      section.classList.toggle("expertise-scroll-enabled", canPin);
      const pin = section.querySelector<HTMLElement>(".expertise-pin");
      const pinStyle = pin ? getComputedStyle(pin) : null;
      const padding = pinStyle
        ? parseFloat(pinStyle.paddingTop) + parseFloat(pinStyle.paddingBottom)
        : 96;
      const enabled = canPin;
      if (enabled) {
        const scale = Math.min(1, Math.max(1, window.innerHeight - padding) / Math.max(1, container.scrollHeight));
        container.style.transformOrigin = "left center";
        container.style.transform = `scale(${scale})`;
        section.style.setProperty("--expertise-right-offset", `${container.clientWidth * (1 - scale) / scale}px`);
      } else {
        container.style.removeProperty("transform");
        container.style.removeProperty("transform-origin");
        section.style.removeProperty("--expertise-right-offset");
      }
      section.classList.toggle("expertise-scroll-enabled", enabled);
      if (!enabled) {
        cancelAnimationFrame(frame);
        frame = 0;
        current = 0;
        velocity = 0;
        lastTime = 0;
        track.style.removeProperty("transform");
        section.style.removeProperty("height");
        return;
      }
      const travel = Math.max(0, track.scrollWidth - container.clientWidth);
      section.style.height = `${window.innerHeight + Math.max(240, travel * 2.5)}px`;
      const range = section.offsetHeight - window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -section.getBoundingClientRect().top / Math.max(1, range)),
      );
      target =
        progress * Math.max(0, track.scrollWidth - container.clientWidth);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const isPinned = () => section.classList.contains("expertise-scroll-enabled");
    const moveTo = (position: number, immediate = false) => {
      const travel = Math.max(0, track.scrollWidth - container.clientWidth);
      const next = Math.max(0, Math.min(travel, position));
      if (isPinned()) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        scrollPageTo(top + (travel ? next / travel : 0) * (section.offsetHeight - window.innerHeight), { immediate, offset: 0 });
      } else {
        track.scrollTo({ left: next, behavior: immediate || reducedMotion.matches ? "instant" : "smooth" });
      }
    };
    navigateRef.current = direction => {
      const card = track.querySelector<HTMLElement>(".expertise-card");
      const step = (card?.offsetWidth ?? 360) + (parseFloat(getComputedStyle(track).gap) || 24);
      moveTo((isPinned() ? target : track.scrollLeft) + direction * step);
    };
    let drag: { id: number; x: number; y: number; position: number; moved: boolean } | null = null;
    let suppressClick = false;
    const onPointerDown = (event: PointerEvent) => {
      if (window.innerWidth <= 809 || event.button !== 0 || (!isPinned() && event.pointerType !== "mouse")) return;
      suppressClick = false;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, position: isPinned() ? current : track.scrollLeft, moved: false };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = drag.x - event.clientX;
      if (!drag.moved) {
        if (Math.abs(dx) < 6 || Math.abs(dx) <= Math.abs(drag.y - event.clientY)) return;
        drag.moved = true;
        track.setPointerCapture(event.pointerId);
        track.style.cursor = "grabbing";
      }
      event.preventDefault();
      moveTo(drag.position + dx, true);
    };
    const endDrag = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      suppressClick = drag.moved;
      drag = null;
      track.style.removeProperty("cursor");
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    };
    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    const onDragStart = (event: DragEvent) => event.preventDefault();
    const onKeyDown = (event: KeyboardEvent) => {
      if (window.innerWidth <= 809) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      navigateRef.current(event.key === "ArrowLeft" ? -1 : 1);
    };
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);
    track.addEventListener("click", onClick, true);
    track.addEventListener("dragstart", onDragStart);
    track.addEventListener("keydown", onKeyDown);
    const revealObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          section.classList.add("expertise-visible");
          revealObserver.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    revealObserver.observe(section);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);
    window.addEventListener("scroll", update, { passive: true });
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    window.addEventListener("resize", update);
    const onFocus = (event: FocusEvent) => {
      if (!isPinned()) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>(
        ".expertise-card",
      );
      if (!card) return;
      const distance = Math.max(1, track.scrollWidth - container.clientWidth);
      const progress = Math.min(1, card.offsetLeft / distance);
      const top = section.getBoundingClientRect().top + window.scrollY;
      scrollPageTo(
        top + progress * (section.offsetHeight - window.innerHeight),
        { immediate: true, offset: 0 },
      );
    };
    track.addEventListener("focusin", onFocus);
    update();
    return () => {
      navigateRef.current = () => {};
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("lostpointercapture", endDrag);
      track.removeEventListener("click", onClick, true);
      track.removeEventListener("dragstart", onDragStart);
      track.removeEventListener("keydown", onKeyDown);
      disposed = true;
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      resizeObserver.disconnect();
      container.style.removeProperty("transform");
      container.style.removeProperty("transform-origin");
      section.style.removeProperty("--expertise-right-offset");
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      track.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <section
      id="products"
      className="products-section expertise-section min-[1200px]:[&.expertise-scroll-enabled]:h-[260vh] min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:sticky min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:top-0 min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:h-[100svh] min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:min-h-0 min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:flex min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:items-center min-[1200px]:[&.expertise-scroll-enabled_.expertise-pin]:py-12 min-[1200px]:[&.expertise-scroll-enabled_.expertise-track]:flex min-[1200px]:[&.expertise-scroll-enabled_.expertise-track]:w-max min-[1200px]:[&.expertise-scroll-enabled_.expertise-track]:[will-change:transform] min-[1200px]:[&.expertise-scroll-enabled_.expertise-card]:w-105 min-[1200px]:[&.expertise-scroll-enabled_.expertise-card]:[flex:0_0_420px] min-[1200px]:[&.expertise-scroll-enabled_.expertise-card]:pt-5 min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-image]:rounded-[12px] min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-image]:overflow-hidden min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-copy]:pt-6 min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-copy]:pr-7.5 min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-copy]:pb-6 min-[1200px]:[&.expertise-scroll-enabled_.expertise-card-copy]:pl-7.5 motion-safe:[&.expertise-visible_.expertise-letter]:[animation:expertise-letter-in_1.1s_cubic-bezier(.16,1,.3,1)_both] motion-safe:[&.expertise-visible_.expertise-letter]:[animation-delay:calc(var(--letter-index)_*_18ms)] motion-safe:[&.expertise-visible_.expertise-card]:[animation:expertise-card-in_.9s_cubic-bezier(.16,1,.3,1)_both] motion-safe:[&.expertise-visible_.expertise-card]:[animation-delay:calc(.1s_+_var(--card-index)_*_.1s)] motion-safe:[&.expertise-visible_.expertise-intro]:[animation:expertise-card-in_1s_.2s_cubic-bezier(.16,1,.3,1)_both] relative bg-[#f5f7f3] text-[var(--ink)]"
      ref={sectionRef}
      aria-labelledby="expertise-title"
    >
      <div className="expertise-pin py-22 max-[809px]:py-16 overflow-clip">
        <div
          className="section-container expertise-container"
          ref={containerRef}
        >
          <div className="expertise-heading flex gap-18 mb-12 [&>div:first-child]:flex-1 [&_.eyebrow]:text-[#545454] [&_.eyebrow]:text-[16px] [&_.eyebrow]:font-medium [&_.eyebrow]:uppercase [&_.eyebrow]:tracking-[0.04em] [&_.eyebrow]:mb-6 [&_.eyebrow>span]:bg-[var(--green)] max-[1199px]:gap-10 max-[809px]:block max-[809px]:mb-8 justify-between items-end">
            <div>
              <Eyebrow>EXPERTISE</Eyebrow>
              <h2
                id="expertise-title"
                aria-label="Choose Our Products & Get the Best."
              >
                <AnimatedLine text="Choose Our Products" />
                <br />
                <span className="expertise-title-accent text-(--green)">
                  <AnimatedLine text="& Get the Best." offset={20} />
                </span>
              </h2>
            </div>
            <div className="expertise-intro [translate:var(--expertise-right-offset,0px)_0] ml-auto text-right pb-0.5 [&_a]:text-[18px] [&_a]:font-medium [&_a>svg]:[transition:transform_.3s] w-90 shrink-0 min-[1200px]:w-[50vw] min-[1200px]:max-w-195 [&_p]:text-[20px] [&_p]:leading-[1.65] [&>a]:text-[#386b2e] [&>a:hover_svg]:[transform:translateX(5px)] max-[1199px]:w-75 max-[809px]:w-full max-[809px]:max-w-125 max-[809px]:mt-6 max-[809px]:[&_p]:text-[18px]">
              <p className="text-[#737b70]">
                Alumex prides itself in being the most trusted aluminium brand
                in Sri Lanka. Rooted in over three decades of expertise and
                undisputed market leadership.
              </p>
              {/* <a
                href="#contact"
                className="inline-flex items-center gap-3 mt-5"
              >
                All Products <ArrowRight size={19} />
              </a> */}
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between gap-4 max-[809px]:hidden">
            <p className="text-sm text-[#737b70]">Drag or swipe to explore</p>
            <div className="ml-auto flex justify-end gap-2 [translate:var(--expertise-right-offset,0px)_0]">
              <button type="button" aria-label="Previous products" aria-controls="product-cards" onClick={() => navigateRef.current(-1)} className="grid size-11 place-items-center rounded-full border border-[#c9d5c2] bg-white text-[#386b2e] transition-colors hover:bg-[#e8f1e1]"><ArrowLeft size={19} /></button>
              <button type="button" aria-label="Next products" aria-controls="product-cards" onClick={() => navigateRef.current(1)} className="grid size-11 place-items-center rounded-full border border-[#c9d5c2] bg-white text-[#386b2e] transition-colors hover:bg-[#e8f1e1]"><ArrowRight size={19} /></button>
            </div>
          </div>
          <div
            role="region"
            aria-label="Product cards. Use left and right arrow keys to explore."
            tabIndex={0}
            className="expertise-track grid grid-cols-[repeat(2,minmax(0,300px))] gap-5 max-[809px]:grid-cols-[minmax(0,300px)] max-[809px]:gap-6 items-stretch justify-center"
            id="product-cards"
            ref={trackRef}
          >
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
            <ProductMoreCard index={products.length} />
          </div>
        </div>
      </div>
    </section>
  );
}
