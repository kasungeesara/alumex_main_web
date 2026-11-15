"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { setScrollLocked } from "@/lib/scroll";

const links = [["Home", "/"], ["Our Aluminium", "/#manufacturing"], ["Products", "/products"], ["Projects", "/projects"], ["About Us", "/about-us"], ["Contact Us", "/contact-us"]];
export function Header({ homeLinks = false }: { homeLinks?: boolean }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const home = path === "/" && !homeLinks;
  useEffect(() => {
    document.body.dataset.eraPage = home ? "home" : "inner";
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const blocks = document.querySelectorAll('.era-hero-scroll, .era-story, .era-architecture, .era-contact, .era-footer, .era-journey, .era-film, .era-details, .era-closing-scroll');
        setDark(Array.from(blocks).some(block => { const rect = block.getBoundingClientRect(); if (block.classList.contains('era-hero-scroll') && rect.top <= 95 && rect.bottom > 95) return -rect.top / Math.max(1, (block as HTMLElement).offsetHeight - innerHeight) < .43; return rect.top <= 95 && rect.bottom > 95; }));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [path, home]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    const focusTimer = window.setTimeout(() => panel.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 100);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (e.key === "Tab") {
        const nodes = [trigger.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(Boolean) as HTMLElement[];
        if (e.shiftKey && document.activeElement === nodes[0]) { e.preventDefault(); nodes.at(-1)?.focus(); }
        else if (!e.shiftKey && document.activeElement === nodes.at(-1)) { e.preventDefault(); nodes[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    return () => { clearTimeout(focusTimer); document.body.style.overflow = previous; setScrollLocked(false); document.removeEventListener("keydown", key); };
  }, [open]);
  return <header className={`era-header ${home ? "era-header-home" : "era-header-inner"} ${dark ? "era-header-dark" : "era-header-light"} ${open ? "era-header-open" : ""}`}>
    <button ref={trigger} className="era-menu-trigger" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="alumex-navigation" onClick={() => setOpen(!open)}>
      <span className="era-seal"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="seal-circle" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" /></defs><text><textPath href="#seal-circle" textLength="244">ALUMEX • ULTIMATE IN ALUMINIUM • </textPath></text></svg><span>{open ? <X size={28} /> : <span className="era-seal-flower">✳</span>}</span></span><span className="era-menu-caption">{open ? "Close" : "Menu"}</span>
    </button>
    {!home && <a href="/" className="era-inner-logo"><img src="/images/home/logo-original.png" alt="Alumex home" width="150" height="40" /></a>}
    <div className="era-header-links"><a className="era-header-products" href="/products">Explore<br />our products</a><a href="/contact-us">Talk to an expert</a><a href="tel:+94112403333">+94 11 240 3333</a></div>
    <div id="alumex-navigation" ref={panel} className="era-menu" role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label="Alumex navigation" aria-hidden={!open} inert={!open} data-lenis-prevent>
      <span className="era-menu-script" aria-hidden="true">Discover</span><nav aria-label="Main navigation">{links.map(([label, href], i) => <a href={home && href.startsWith('/#') ? href.slice(1) : href} key={label} style={{ transitionDelay: open ? `${i * 55 + 150}ms` : "0ms" }} onClick={() => { setOpen(false); setScrollLocked(false); }}><small>0{i + 1}</small><span className="era-rolling-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><ArrowUpRight size={28} /></a>)}</nav><div className="era-menu-bottom"><span>Precision made in Sri Lanka.</span><a href="mailto:info@alumexgroup.com">info@alumexgroup.com ↗</a></div>
    </div>
  </header>;
}
