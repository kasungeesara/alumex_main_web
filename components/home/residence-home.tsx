"use client";

import { useEffect, useRef, useState, type ReactNode, Children, cloneElement, isValidElement } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { products } from "./products-data";
import { HeroDome, HorizontalJourney, CinematicFilm, DetailShowcase, ArchitecturePortal, SplitHeading, MotionDetails } from "./motion-scenes";

const finishes = [
  { name: "Mill finish", image: "/images/home/millfinish.jpg", copy: "High-performance aluminium extrusions for architectural, industrial and residential solutions." },
  { name: "Powder coating", image: "/images/home/powder.webp", copy: "Durable, beautifully finished aluminium with a wide choice of colours. A protective finish for architectural and residential applications." },
  { name: "Anodizing", image: "/images/home/anodizing.jpg", copy: "A refined, durable surface that enhances the natural beauty of aluminium, with excellent resistance to corrosion and wear." },
  { name: "Woodex", image: "/images/home/wood.webp", copy: "The warmth and character of wood with the strength and durability of aluminium. Beautiful finishes for contemporary spaces." },
  { name: "Satin finish", image: "/images/home/Satin.jpg", copy: "A smooth, softly brushed aluminium finish with a subtle sheen, bringing a refined look to architectural and interior applications." },
  { name: "Value addition", image: "/images/home/value.jpeg", copy: "Custom fabrication and precision finishing to take your aluminium profiles from concept to a complete solution." },
];
const pillars = [
  { name: "Made with precision", image: "/images/about/precision.jpg", copy: "State-of-the-art manufacturing facilities, from exclusive powder coating through to value addition." },
  { name: "Crafted to endure", image: "/images/home/residential-photo.webp", copy: "Powder coated and anodized aluminium profiles with a warranty period of up to 30 years." },
  { name: "Trusted worldwide", image: "/images/projects/dimo-hero.jpg", copy: "Over three decades of expertise and undisputed market leadership. Precision made in Sri Lanka. Trusted around the world." },
];
function useSiteReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}
function revealHeadings(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (['h1', 'h2', 'h3'].includes(String(child.type))) return cloneElement(child, {}, <SplitHeading>{child.props.children}</SplitHeading>);
    return child;
  });
}
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useSiteReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: 1.05, delay, ease: [.22, 1, .36, 1] }}>{revealHeadings(children)}</motion.div>;
}
function Frame() { return <div className="era-frame" aria-hidden="true"><i /><i /><i /><i /></div>; }
function TextLink({ href, children }: { href: string; children: ReactNode }) { return <a className="era-text-link" href={href}><span className="era-rolling-label"><span>{children}</span><span aria-hidden="true">{children}</span></span><ArrowUpRight size={18} /></a>; }
function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return <div ref={ref} className={`era-parallax ${className}`}><motion.img src={src} alt={alt} loading="lazy" style={{ y: reduce ? 0 : y }} /></div>;
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [view, setView] = useState("architecture");
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const titleY = useTransform(scrollYProgress, [0, .22], [0, -280]);
  const opacity = useTransform(scrollYProgress, [0, .18], [1, 0]);

  return <section className="era-hero-scroll" ref={ref} id="top" aria-label="Alumex aluminium solutions"><div className="era-hero-sticky"><motion.div className="era-hero-scene">
    <motion.img className={`era-hero-image ${view === 'architecture' ? 'is-active' : ''}`} src="/images/home/house.jpg" alt="Contemporary architecture with expansive aluminium framed glazing" style={{ scale: reduce ? 1 : scale }} fetchPriority="high" />
    <motion.img className={`era-hero-image ${view === 'precision' ? 'is-active' : ''}`} src="/images/about/production.webp" alt="Precision aluminium manufacturing at Alumex" style={{ scale: reduce ? 1 : scale }} />
    <div className="era-hero-shade" />
    <motion.div className="era-hero-title" style={{ y: reduce ? 0 : titleY, opacity: reduce ? 1 : opacity }}><p className="era-label">Sri Lanka · Since 1986</p><h1><span><SplitHeading>ALUMEX</SplitHeading></span><span><SplitHeading>ALUMINIUM</SplitHeading></span></h1><span className="era-script">Shaping possibilities</span><div className="era-hero-switch" aria-label="Hero view"><button aria-pressed={view === 'architecture'} onClick={() => setView('architecture')}>Architecture</button><span /><button aria-pressed={view === 'precision'} onClick={() => setView('precision')}>Precision</button></div><div className="era-hero-tagline"><span>Precision in</span><span>every profile.</span></div></motion.div>
    <a href="#manufacturing" className="era-scroll-cue"><span>Scroll to discover</span><ArrowDown size={24} /></a><a href="/products" className="era-orbit-link"><span>Explore our<br />aluminium solutions</span><ArrowUpRight size={23} /></a>
    <div className="era-hotspots"><a href="/products/slenderline" aria-label="Discover Slenderline windows"><Plus size={17} /><span>Light & flow<br /><small>Discover Slenderline</small></span></a><a href="/products/lumin" aria-label="Discover Lumin architectural profiles"><Plus size={17} /><span>Crafted to endure<br /><small>Explore Lumin</small></span></a></div>
    <HeroDome progress={scrollYProgress} />
  </motion.div></div></section>;
}
function ProductGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const drag = useRef({ x: 0, scroll: 0, moved: false });
  const go = (direction: number) => { const el = track.current; if (el) el.scrollBy({ left: direction * (el.clientWidth * .66), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
  return <section className="era-products" id="products"><div className="era-products-heading"><Reveal><p className="era-label">Designed around your space</p><h2>The freedom<br />to <em>create.</em></h2></Reveal><Reveal className="era-products-intro"><p>Aluminium solutions that bring comfort, strength and a refined finish to every space. Discover the profile that makes your vision possible.</p><TextLink href="/products">View all products</TextLink></Reveal></div>
    <div className="era-gallery" ref={track} tabIndex={0} role="region" aria-label="Product gallery, scroll to explore" onScroll={() => { const el = track.current; if (el) setPage(Math.round(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth) * (products.length - 1))); }} onPointerDown={e => { if (e.pointerType !== 'mouse') return; drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft, moved: false }; }} onPointerMove={e => { if (e.buttons !== 1 || e.pointerType !== 'mouse') return; const d = e.clientX - drag.current.x; if (Math.abs(d) > 7) { drag.current.moved = true; e.currentTarget.scrollLeft = drag.current.scroll - d; } }} onClickCapture={e => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; } }}>
    {products.map((p, i) => <a key={p.name} href={p.href} className="era-product-card" draggable={false}><div className="era-product-photo"><img src={["/images/home/household.webp", "/images/home/industrial.webp", "/images/home/dwelling.webp", "/images/home/hardware.webp", "/images/home/expertise3.png", "/images/home/residential-photo.webp"][i]} alt={`${p.name} aluminium solutions`} loading="lazy" draggable={false} /><span className="era-product-no">0{i + 1} / 06</span><span className="era-product-plus"><ArrowUpRight size={24} /></span></div><div className="era-product-caption"><div><p className="era-label">{p.category}</p><h3>{p.name}</h3></div><p>{p.description}</p></div></a>)}
    </div><div className="era-gallery-controls"><span className="era-label">Drag to see more</span><div className="era-gallery-progress"><span style={{ transform: `translateX(${page * 100}%)` }} /></div><div><button aria-label="Previous products" onClick={() => go(-1)} disabled={page === 0}><ArrowLeft size={20} /></button><button aria-label="Next products" onClick={() => go(1)} disabled={page === products.length - 1}><ArrowRight size={20} /></button></div></div>
  </section>;
}
function FinishSection() {
  const [active, setActive] = useState(0);
  return <section className="era-finishes" id="manufacturing"><div className="era-section-top"><span className="era-label">01 / Our craft</span><span className="era-label">Ultimate in aluminium profiles</span></div><Reveal className="era-finishes-title"><h2>Beautiful by design.<br /><em>Exceptional by nature.</em></h2><p>Sri Lanka&apos;s foremost aluminium extrusion manufacturer. Producing best-in-class commercial, industrial, residential and architectural profiles that shape industries around the world.</p></Reveal><div className="era-finish-layout"><div className="era-finish-visual"><motion.img key={active} src={finishes[active].image} alt={`${finishes[active].name} aluminium finish`} initial={{ opacity: .3, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} /><Frame /><span className="era-finish-image-label">ALUMEX / MATERIAL LIBRARY</span></div><div className="era-finish-content"><p className="era-script">The finishing touch</p><div role="tablist" aria-label="Aluminium finishes" className="era-finish-tabs">{finishes.map((f, i) => <button id={`finish-${i}`} key={f.name} role="tab" tabIndex={active === i ? 0 : -1} aria-selected={active === i} aria-controls="finish-description" onClick={() => setActive(i)} onKeyDown={e => { if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? finishes.length - 1 : (active + (['ArrowUp', 'ArrowLeft'].includes(e.key) ? -1 : 1) + finishes.length) % finishes.length; setActive(next); document.getElementById(`finish-${next}`)?.focus(); } }}><span>0{i + 1}</span>{f.name}<ArrowUpRight size={20} /></button>)}</div><div id="finish-description" role="tabpanel" aria-labelledby={`finish-${active}`}><p>{finishes[active].copy}</p></div><TextLink href="/products">Find your finish</TextLink></div></div></section>;
}
function Pillars() { return <section className="era-pillars" id="reasons"><div className="era-section-top"><span className="era-label">02 / The Alumex difference</span><span className="era-label">Designed to last. Built to inspire.</span></div><Reveal><h2>A stronger<br /><em>perspective.</em></h2></Reveal><div className="era-pillar-grid">{pillars.map((p, i) => <Reveal key={p.name} delay={i * .1}><article><span className="era-label">0{i + 1}</span><h3>{p.name}</h3><ParallaxImage src={p.image} alt={p.name} /><p>{p.copy}</p></article></Reveal>)}</div><Reveal className="era-quote"><span className="era-asterisk">✳</span><p>More than aluminium.<br />The beginning of <em>possibility.</em></p><span className="era-label">Alumex PLC · A member of Hayleys</span></Reveal></section>; }
function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0, .45], ["inset(12% 22% 0% 22% round 45% 45% 0 0)", "inset(0% 0% 0% 0% round 0% 0% 0 0)"]);
  return <section ref={ref} className="era-architecture" id="projects"><ArchitecturePortal /><motion.div className="era-architecture-image" style={{ clipPath: reduce ? 'none' : clipPath }}><ParallaxImage src="/images/projects/dimo-hero.jpg" alt="DIMO 800 Mercedes Benz Centre, an Alumex landmark project" /><div className="era-architecture-shade" /><Reveal className="era-architecture-title"><p className="era-label">03 / Our work in action</p><h2>Architecture<br />with <em>presence.</em></h2><span className="era-script">Built on possibility</span></Reveal><div className="era-architecture-bottom"><span>DIMO 800<br />Mercedes Benz Centre</span><a href="/projects/dimo-800-mercedes-benz-centre" className="era-orbit-link"><span>Explore<br />the project</span><ArrowUpRight size={24} /></a></div></motion.div><div className="era-projects-row"><Reveal><p className="era-label">From profile to possibility</p><h3>Spaces that<br />speak for themselves.</h3><TextLink href="/projects">Explore our portfolio</TextLink></Reveal><a href="/projects" className="era-small-project"><ParallaxImage src="/images/projects/nsbm-campus.jpg" alt="NSBM Green University landscaped campus" /><span>Inspired spaces. Enduring impressions.<ArrowUpRight size={21} /></span></a></div></section>;
}
function Quality() {
  const [active, setActive] = useState(0);
  const entries = [
    { title: 'Certified supply chain', copy: 'Superior quality billets made of virgin metal, processed with essential pretreatment chemical agents and certified coatings.' },
    { title: 'World-class facilities', copy: 'State-of-the-art facilities including exclusive powder coating through to value addition.' },
    { title: 'Up to 30 years warranty', copy: 'All Alumex powder coated and anodized aluminium profiles come with a warranty period of up to 30 years.' },
    { title: 'QUALICOAT & QUALANOD', copy: 'Committed to the Qualicoat, Qualicoat Sea Side and Qualanod quality certification labels, assuring internationally accredited standards.' },
  ];
  return <section className="era-quality" id="sustainability"><Reveal><p className="era-label">Confidence, in every detail</p><h2>Crafted<br />to <em>endure.</em></h2><p className="era-quality-intro">Rooted in over three decades of expertise. Engineered for the world we build tomorrow.</p></Reveal><div className="era-quality-accordion">{entries.map((e, i) => <div className={active === i ? 'is-active' : ''} key={e.title}><h3><button aria-expanded={active === i} aria-controls={`quality-${i}`} onClick={() => setActive(active === i ? -1 : i)}><span>0{i + 1}</span>{e.title}<Plus size={20} /></button></h3><div id={`quality-${i}`} className="era-accordion-body" inert={active !== i}><div><p>{e.copy}</p></div></div></div>)}</div></section>;
}
function Network() {
  return <section className="era-network" id="market"><Frame /><Reveal><p className="era-label">04 / Connected by excellence</p><h2>Made here.<br /><em>Trusted everywhere.</em></h2><p>Precision made in Sri Lanka. Trusted around the world.<br />Building lasting relationships with 300+ partners.</p></Reveal><div className="era-client-logos">{['dimo', 'kingsbury', 'prime', 'maga', 'jat', 'ceb'].map(id => <img key={id} src={`/images/home/client-${id}.webp`} alt={{ dimo: 'DIMO', kingsbury: 'The Kingsbury', prime: 'Prime Residencies', maga: 'MAGA', jat: 'JAT', ceb: 'Ceylon Electricity Board' }[id]} loading="lazy" />)}</div><div id="partners" className="era-partners"><p className="era-label">Our strategic partners</p><div>{['aluk', 'sudaltex', 'ega', 'italtecno', 'alpolic'].map(id => <img key={id} src={`/images/home/partner-${id}.webp`} alt={id.toUpperCase()} loading="lazy" />)}</div></div></section>;
}
function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(0% 0% 0% 0%)', 'inset(8% 22% 8% 22%)']);
  const opacity = useTransform(scrollYProgress, [.2, .6], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [.6, 1], [0, 1]);
  return <section ref={ref} className="era-closing-scroll"><div className="era-closing-pin"><motion.div className="era-contact" id="contact" style={{ clipPath: reduce ? 'none' : clip }}><ParallaxImage src="/images/projects/residential-6.jpg" alt="Modern residence with aluminium doors opening to the garden" /><div className="era-contact-overlay" /><motion.div className="era-contact-copy" style={{ opacity: reduce ? 1 : opacity }}><Reveal><p className="era-label">Every great space starts with a conversation</p><h2>Your vision.<br /><em>Our expertise.</em></h2><p>Let&apos;s shape something extraordinary together.</p><a className="era-orbit-link" href="/contact-us"><span>Talk to an<br />aluminium expert</span><ArrowUpRight size={23} /></a></Reveal></motion.div></motion.div><motion.div className="era-closing-caption" style={{ opacity: reduce ? 0 : captionOpacity }}><span className="era-script">Let’s shape the future.</span><a href="/contact-us" className="era-text-link">Start a conversation <ArrowUpRight size={18} /></a></motion.div></div></section>; }
export function ResidenceHome() {
  const progress = useRef<HTMLSpanElement>(null);
  const percent = useRef<HTMLSpanElement>(null);
  useEffect(() => { const update = () => { if (progress.current) { const total = document.documentElement.scrollHeight - innerHeight; if (percent.current) percent.current.textContent = String(Math.round(total > 0 ? scrollY / total * 100 : 0)).padStart(2, "0"); progress.current.style.transform = `scaleY(${total > 0 ? scrollY / total : 0})`; } }; window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <div className="era-home"><MotionDetails /><Header /><div className="era-page-progress" aria-hidden="true"><span ref={progress} /><small ref={percent}>00</small></div><main><Hero /><FinishSection /><Pillars /><section className="era-story"><Reveal><p className="era-label">The story behind every profile</p><h2>Strength.<br />Beauty.<br /><em>Possibility.</em></h2></Reveal><div><ParallaxImage src="/images/about/overview.jpg" alt="The Alumex team working with aluminium profiles" /><Reveal><h3>Shaping the future,<br />since 1986.</h3><p>As a proud member of the Hayleys Group, Alumex delivers world-class aluminium products and services across diverse industries. From architectural applications to industrial requirements, we transform ideas into innovative solutions.</p><TextLink href="/about-us">Discover Alumex</TextLink></Reveal></div></section><HorizontalJourney /><ProductGallery /><CinematicFilm /><DetailShowcase /><Architecture /><Quality /><Network /><Contact /></main><Footer /></div>;
}
