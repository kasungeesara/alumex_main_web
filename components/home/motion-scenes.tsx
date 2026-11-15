"use client";

import { useEffect, useRef, useState, type ReactNode, cloneElement, isValidElement } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X, ZoomIn } from "lucide-react";
import { setScrollLocked } from "@/lib/scroll";

export function useMotionPreference() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduce(media.matches); update(); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, []);
  return reduce;
}
export function SplitHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useMotionPreference();
  let index = 0;
  const split = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') return node.split(/(\s+)/).map((word, wi) => /^\s+$/.test(word) ? word : <span className="era-split-word" key={`${wi}-${word}`}>{[...word].map(char => { const i = index++; return <motion.span className="era-split-char" key={i} variants={{ hidden: { opacity: 0, y: '55%', rotateY: 90 }, visible: { opacity: 1, y: '0%', rotateY: 0, transition: { duration: 1.2, delay: Math.min(i * .035, 1.25), ease: [.25, 1, .5, 1] } } }}>{char}</motion.span>; })}</span>);
    if (Array.isArray(node)) return node.map((child, i) => <span key={i}>{split(child)}</span>);
    if (isValidElement<{ children?: ReactNode }>(node) && node.props.children) return cloneElement(node, {}, split(node.props.children));
    return node;
  };
  return <motion.span className={`era-split-heading ${className}`} initial="hidden" whileInView="visible" viewport={{ amount: .2, once: true }} animate={reduce ? 'visible' : undefined}>{split(children)}</motion.span>;
}
export function HeroDome({ progress }: { progress: MotionValue<number> }) {
  const reduce = useMotionPreference();
  const y = useTransform(progress, [0, .22, .43, .65, 1], ['115vh', '115vh', '8vh', '-22vh', '-115vh']);
  const rotate = useTransform(progress, [.22, .75], [-12, 12]);
  const spacing = useTransform(progress, [.25, .7], ['0px', '18px']);
  const cardY = useTransform(progress, [.45, .7, 1], ['110vh', '54vh', '-30vh']);
  const cardRotate = useTransform(progress, [.5, 1], [8, -5]);
  return <>
    <motion.div className="era-rising-dome" style={{ y: reduce ? '115vh' : y }} aria-label="Three reasons to choose Alumex"><div className="era-dome-surface" />
      <motion.svg className="era-dome-arc" viewBox="0 0 1200 650" style={{ rotate: reduce ? 0 : rotate }} aria-hidden="true"><defs><path id="alumex-dome-arc" d="M 100 550 A 500 500 0 0 1 1100 550" /></defs><motion.text style={{ wordSpacing: reduce ? 0 : spacing }}><textPath href="#alumex-dome-arc" startOffset="50%" textAnchor="middle">THREE REASONS TO CHOOSE ALUMEX</textPath></motion.text></motion.svg>
      <div className="era-dome-center"><span>PRECISION</span><span className="era-dome-star">✳</span><span>POSSIBILITY</span></div><div className="era-dome-desc"><span className="era-dome-rule" /><p>Designed to last.<br />Built to inspire.</p><ArrowDown size={22} /></div>
    </motion.div>
    <motion.div className="era-dome-cards" style={{ y: reduce ? '115vh' : cardY, rotate: reduce ? 0 : cardRotate }}>{[{ title: 'Precision', img: '/images/about/precision.jpg', text: 'State-of-the-art manufacturing.' }, { title: 'Endurance', img: '/images/projects/residential-6.jpg', text: 'A warranty of up to 30 years.' }, { title: 'Trust', img: '/images/projects/dimo-hero.jpg', text: 'Sri Lankan expertise. Global confidence.' }].map((p, i) => <article key={p.title}><span>0{i + 1} / THE ALUMEX DIFFERENCE</span><h2>{p.title}</h2><img src={p.img} alt={p.title} /><p>{p.text}</p></article>)}</motion.div>
  </>;
}
const moments = [
  { image: '/images/home/house.jpg', title: 'Space to imagine.', label: 'ARCHITECTURAL FREEDOM' },
  { image: '/images/projects/residential-6.jpg', title: 'Light to live in.', label: 'RESIDENTIAL SOLUTIONS' },
  { image: '/images/about/production.webp', title: 'Strength to build.', label: 'INDUSTRIAL PRECISION' },
];
export function HorizontalJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%']);
  const titleX = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);
  return <section ref={ref} className="era-journey" aria-label="Spaces shaped by Alumex"><div className="era-journey-pin"><motion.div className="era-journey-track" style={{ x: reduce ? 0 : x }}>{moments.map((m, i) => <article key={m.title}><img src={m.image} alt={m.title} loading="lazy" /><div className="era-journey-shade" /><div className="era-journey-count">0{i + 1} / 03</div><motion.div className="era-journey-copy" style={{ x: reduce ? 0 : titleX }}><p className="era-label">{m.label}</p><h2>{m.title}</h2><a href="/products">Explore the possibilities <ArrowUpRight size={20} /></a></motion.div><span className="era-journey-flower" aria-hidden="true">✳</span></article>)}</motion.div><div className="era-journey-progress"><motion.span style={{ scaleX: reduce ? 1 : scrollYProgress }} /></div><span className="era-journey-instruction era-label">Scroll to explore →</span></div></section>;
}
export const originalHeroVideo = '/videos/alumex-original-hero.mp4';
export function CinematicFilm() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const clip = useTransform(scrollYProgress, [0, .65], ['inset(16% 25% 16% 25% round 45% 45% 0% 0%)', 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const titleY = useTransform(scrollYProgress, [0, .8], ['20vh', '-12vh']);
  useEffect(() => {
    const el = video.current; const section = ref.current; if (!el || !section) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting || reduce || !playing) el.pause(); else void el.play().catch(() => setPlaying(false)); }, { threshold: .1 });
    observer.observe(section); return () => observer.disconnect();
  }, [reduce, playing]);
  return <section ref={ref} className="era-film" aria-label="The original Alumex brand film"><div className="era-film-pin"><motion.div className="era-film-window" style={{ clipPath: reduce ? 'none' : clip }}><motion.video ref={video} src={originalHeroVideo} poster="/images/home/house.jpg" autoPlay muted loop playsInline preload="metadata" onError={() => setFailed(true)} style={{ scale: reduce ? 1 : scale }} aria-label="Alumex architecture and manufacturing brand film" /><div className="era-film-shade" /><motion.div className="era-film-title" style={{ y: reduce ? 0 : titleY }}><p className="era-label">Precision in motion · The Alumex film</p><h2><SplitHeading>Every profile.</SplitHeading><br /><em><SplitHeading>Every possibility.</SplitHeading></em></h2></motion.div></motion.div><div className="era-film-bottom"><span className="era-label">The original Alumex story</span><button aria-label={playing ? 'Pause brand film' : 'Play brand film'} aria-pressed={playing} onClick={() => { if (playing) video.current?.pause(); else void video.current?.play().catch(() => setFailed(true)); setPlaying(!playing); }}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? 'Pause film' : 'Play film'}</button>{failed && <a href={originalHeroVideo} target="_blank" rel="noreferrer">Open original film ↗</a>}</div></div></section>;
}
const detailSlides = [
  { title: 'Architectural freedom', image: '/images/home/house.jpg', text: 'Profiles that connect your space to the world outside.', href: '/products/architectural' },
  { title: 'A refined finish', image: '/images/home/wood.webp', text: 'Natural character. The enduring strength of aluminium.', href: '/#manufacturing' },
  { title: 'Precision engineering', image: '/images/about/precision.jpg', text: 'From concept to a complete aluminium solution.', href: '/products/industrial' },
  { title: 'Light and flow', image: '/images/projects/residential-6.jpg', text: 'Windows, doors and framing designed around your space.', href: '/products/slenderline' },
  { title: 'Lasting confidence', image: '/images/projects/dimo-hero.jpg', text: 'Trusted by the teams behind extraordinary projects.', href: '/projects' },
];
export function DetailShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [magnified, setMagnified] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [.65, 1], [1, 1.8]);
  const opacity = useTransform(scrollYProgress, [.75, 1], [1, 0]);
  useEffect(() => { const off = scrollYProgress.on('change', value => { if (!reduce) setActive(Math.min(detailSlides.length - 1, Math.floor(value / .74 * detailSlides.length))); }); return off; }, [scrollYProgress, reduce]);
  useEffect(() => {
    if (!zoom) return;
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; setScrollLocked(true); dialog.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setZoom(false); setMagnified(false); trigger.current?.focus(); } if (e.key === 'ArrowRight') { setActive(v => (v + 1) % detailSlides.length); setMagnified(false); } if (e.key === 'ArrowLeft') { setActive(v => (v + detailSlides.length - 1) % detailSlides.length); setMagnified(false); } if (e.key === 'Tab') { const nodes = dialog.current?.querySelectorAll<HTMLElement>('button'); if (!nodes?.length) return; if (e.shiftKey && (document.activeElement === nodes[0] || document.activeElement === dialog.current)) { e.preventDefault(); nodes[nodes.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === nodes[nodes.length - 1]) { e.preventDefault(); nodes[0].focus(); } } };
    document.addEventListener('keydown', key); return () => { document.body.style.overflow = previous; setScrollLocked(false); document.removeEventListener('keydown', key); };
  }, [zoom]);
  const select = (i: number) => { setActive(i); if (!reduce && ref.current) { const rect = ref.current.getBoundingClientRect(); const range = ref.current.offsetHeight - innerHeight; window.scrollTo({ top: scrollY + rect.top + (i + .2) / detailSlides.length * .74 * range, behavior: 'instant' }); } };
  return <section ref={ref} className="era-details" aria-label="Alumex details, scroll through five perspectives"><div className="era-details-pin"><motion.div className="era-details-stage" style={{ scale: reduce ? 1 : scale, opacity: reduce ? 1 : opacity }}>{detailSlides.map((s, i) => <motion.img key={s.title} src={s.image} alt={s.title} className="era-detail-image" animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.1, clipPath: active === i ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }} transition={{ duration: reduce ? 0 : 1.1, ease: [.75, 0, .25, 1] }} />)}<div className="era-details-shade" /><div className="era-details-copy" key={active}><p className="era-label">0{active + 1} / 05 · Every detail matters</p><h2><SplitHeading>{detailSlides[active].title}</SplitHeading></h2><p>{detailSlides[active].text}</p><a href={detailSlides[active].href}>Explore <ArrowUpRight size={18} /></a></div><button ref={trigger} className="era-detail-zoom" aria-label="Open detail image gallery" onClick={() => setZoom(true)}><ZoomIn size={20} /></button></motion.div><div className="era-detail-tabs" role="tablist" aria-label="Detail perspectives">{detailSlides.map((s, i) => <button key={s.title} role="tab" aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + detailSlides.length) % detailSlides.length; select(next); (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus(); } }}>{s.title}<span /></button>)}</div></div>
    {zoom && <div ref={dialog} tabIndex={-1} className="era-lightbox" role="dialog" aria-modal="true" aria-label="Alumex image gallery" data-lenis-prevent><button className="era-lightbox-close" aria-label="Close detail gallery" onClick={() => { setZoom(false); setMagnified(false); trigger.current?.focus(); }}><X /></button><button className="era-lightbox-prev" aria-label="Previous detail image" onClick={() => { setActive((active + detailSlides.length - 1) % detailSlides.length); setMagnified(false); }}><ArrowLeft /></button><button className={`era-lightbox-image ${magnified ? 'is-zoomed' : ''}`} aria-label={magnified ? 'Zoom out image' : 'Zoom in image'} onClick={() => setMagnified(!magnified)}><img src={detailSlides[active].image} alt={detailSlides[active].title} /></button><button className="era-lightbox-next" aria-label="Next detail image" onClick={() => { setActive((active + 1) % detailSlides.length); setMagnified(false); }}><ArrowRight /></button><p>{String(active + 1).padStart(2, '0')} / 05 — {detailSlides[active].title}</p></div>}
  </section>;
}
export function ArchitecturePortal() {
  const ref = useRef<HTMLDivElement>(null); const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const left = useTransform(scrollYProgress, [0, .55, .85], ['0%', '-30%', '-110%']);
  const right = useTransform(scrollYProgress, [0, .55, .85], ['0%', '30%', '110%']);
  const scale = useTransform(scrollYProgress, [0, .8], [.65, 1.05]);
  return <div ref={ref} className="era-portal" aria-hidden="true"><motion.div className="era-portal-image" style={{ scale: reduce ? 1 : scale }}><img src="/images/projects/dimo-hero.jpg" alt="" /></motion.div><motion.div className="era-portal-panel era-portal-left" style={{ x: reduce ? '-110%' : left }}><span>Archi</span><i>✳</i></motion.div><motion.div className="era-portal-panel era-portal-right" style={{ x: reduce ? '110%' : right }}><span>tecture</span><i>✳</i></motion.div></div>;
}

export function MotionDetails() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.era-orbit-link, .era-text-link, .era-menu-trigger, .era-detail-zoom, .era-gallery-controls button'));
    const move = (e: PointerEvent) => {
      if (media.matches || e.pointerType !== 'mouse') return;
      const el = e.currentTarget as HTMLElement; const box = el.getBoundingClientRect();
      el.style.setProperty('--magnet-x', `${(e.clientX - box.left - box.width / 2) * .18}px`);
      el.style.setProperty('--magnet-y', `${(e.clientY - box.top - box.height / 2) * .18}px`);
    };
    const reset = (e: PointerEvent) => { const el = e.currentTarget as HTMLElement; el.style.setProperty('--magnet-x', '0px'); el.style.setProperty('--magnet-y', '0px'); };
    nodes.forEach(el => { el.addEventListener('pointermove', move); el.addEventListener('pointerleave', reset); });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('era-in-view', entry.isIntersecting)), { threshold: .15 });
    document.querySelectorAll('.era-section-top, .era-finish-visual, .era-projects-row, .era-network, .era-footer').forEach(el => observer.observe(el));
    return () => { nodes.forEach(el => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); }); observer.disconnect(); };
  }, []);
  return null;
}
