"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const market = (label: string, lat: number, lng: number) => ({
  label,
  lat,
  lng,
  body: `Explore Alumex aluminium solutions for the ${label.toLowerCase()} market.`,
  ctaLabel: "Enquire about exports",
  ctaLink: `mailto:info@alumexgroup.com?subject=${encodeURIComponent(`${label} export enquiry`)}`,
});

const places = [
  {
    label: "SRI LANKA",
    lat: 6.9271,
    lng: 79.8612,
    body: "Our home. Aluminium solutions manufactured in Sri Lanka and delivered around the world.",
    ctaLabel: "Talk to our team",
    ctaLink: "mailto:info@alumexgroup.com",
  },
  market("CANADA", 45.4215, -75.6972),
  market("USA", 38.9072, -77.0369),
  market("UK", 51.5074, -0.1278),
  market("SWITZERLAND", 46.948, 7.4474),
  market("KENYA", -1.2921, 36.8219),
  market("GERMANY", 52.52, 13.405),
  market("SEYCHELLES", -4.6191, 55.4513),
  market("MALDIVES", 4.1755, 73.5093),
  market("ITALY", 41.9028, 12.4964),
  market("ISRAEL", 31.7683, 35.2137),
  market("UAE", 25.2048, 55.2708),
  market("INDIA", 28.6139, 77.209),
  market("NEPAL", 27.7172, 85.324),
  market("BANGLADESH", 23.8103, 90.4125),
  market("INDONESIA", -6.2088, 106.8456),
  market("AUSTRALIA", -33.8688, 151.2093),
  market("NEW ZEALAND", -36.8485, 174.7633),
];

const markerStyles: Record<string, { flag: string; dx: number; dy: number }> = {
  "SRI LANKA": { flag: "lk", dx: 0, dy: 32 },
  CANADA: { flag: "ca", dx: -18, dy: -35 },
  USA: { flag: "us", dx: -20, dy: 22 },
  UK: { flag: "gb", dx: -56, dy: -45 },
  SWITZERLAND: { flag: "ch", dx: -48, dy: 18 },
  KENYA: { flag: "ke", dx: -15, dy: 28 },
  GERMANY: { flag: "de", dx: 4, dy: -58 },
  SEYCHELLES: { flag: "sc", dx: -8, dy: 32 },
  MALDIVES: { flag: "mv", dx: -35, dy: 14 },
  ITALY: { flag: "it", dx: 13, dy: 27 },
  ISRAEL: { flag: "il", dx: -20, dy: 16 },
  UAE: { flag: "ae", dx: 0, dy: 22 },
  INDIA: { flag: "in", dx: -29, dy: -12 },
  NEPAL: { flag: "np", dx: 0, dy: -44 },
  BANGLADESH: { flag: "bd", dx: 25, dy: -16 },
  INDONESIA: { flag: "id", dx: 15, dy: 24 },
  AUSTRALIA: { flag: "au", dx: -5, dy: 25 },
  "NEW ZEALAND": { flag: "nz", dx: -4, dy: 25 },
};
const routeColors = ["#579cdb", "#8e75ce", "#e5a054", "#52ae94", "#d87fa3", "#73ac57"];

// Same equirectangular bounds as the bundled dotted land asset.
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 1000,
  y: ((85 - lat) / 145) * 470,
});
const home = project(places[0].lat, places[0].lng);
const destinations = places.slice(1).map((place, index) => {
  const point = project(place.lat, place.lng);
  const distance = Math.hypot(point.x - home.x, point.y - home.y);
  const lift = Math.min(160, Math.max(28, distance * .32));
  return {
    ...place,
    ...point,
    path: `M ${home.x} ${home.y} Q ${(home.x + point.x) / 2} ${Math.min(home.y, point.y) - lift} ${point.x} ${point.y}`,
    delay: .25 + index * .14,
  };
});

export function ExportGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupSpace, setPopupSpace] = useState(0);
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const activePlace = places[selected];
  const activePoint = project(activePlace.lat, activePlace.lng);
  const activeMarker = markerStyles[activePlace.label];

  useEffect(() => {
    const map = mapRef.current;
    const popup = popupRef.current;
    if (!open || !map || !popup) return;
    const measure = () => {
      setPopupSpace(Math.max(0, popup.offsetTop + popup.offsetHeight + 24 - map.offsetHeight));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(map);
    observer.observe(popup);
    return () => observer.disconnect();
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => {
      host.style.setProperty("--map-play-state", entry.isIntersecting ? "running" : "paused");
      if (entry.isIntersecting) setEntered(true);
    }, { threshold: .15 });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="mx-auto mt-10 w-full max-[600px]:mt-6" style={{ paddingBottom: open ? popupSpace : 0 }}>
      <div className="w-full" role="region" aria-label="Animated export world map. Select a country flag to highlight its route.">
        <div ref={mapRef} className="relative mx-auto aspect-[1000/550] w-[90%] max-[600px]:w-full">
          <svg viewBox="0 -55 1000 550" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <radialGradient id="export-home-glow"><stop stopColor="#62bd46" stopOpacity=".18" /><stop offset="1" stopColor="#62bd46" stopOpacity="0" /></radialGradient>
            </defs>
            <image href="/images/home/export-world-map.svg" width="1000" height="470" />
            <circle cx={home.x} cy={home.y} r="70" fill="url(#export-home-glow)" />
            {destinations.map((place, index) => {
              const color = routeColors[index % routeColors.length];
              return <g key={place.label}>
                <path
                  d={place.path}
                  fill="none"
                  stroke={color}
                  strokeWidth={selected === index + 1 ? 3 : 1.9}
                  strokeOpacity={selected === index + 1 ? 1 : .8}
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  className={`transition-[stroke-width,stroke-opacity] duration-300 motion-reduce:[stroke-dashoffset:0] motion-reduce:opacity-100 motion-reduce:animate-none ${entered ? "animate-[export-route-draw_1.6s_cubic-bezier(.2,.7,.3,1)_both] [animation-delay:var(--route-delay)] [animation-play-state:var(--map-play-state,running)]" : "opacity-0"}`}
                  style={{ "--route-delay": `${place.delay}s` } as CSSProperties}
                />
                {entered && <circle r={selected === index + 1 ? 3.5 : 2.6} fill={color} opacity="0" className="motion-reduce:hidden">
                  <animateMotion path={place.path} dur={`${3.5 + index % 4 * .5}s`} begin={`${place.delay + 1.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur={`${3.5 + index % 4 * .5}s`} begin={`${place.delay + 1.3}s`} repeatCount="indefinite" />
                </circle>}
              </g>;
            })}
            {places.map((place, index) => {
              const point = project(place.lat, place.lng);
              const marker = markerStyles[place.label];
              const color = index === 0 ? "#62bd46" : routeColors[(index - 1) % routeColors.length];
              return <g key={place.label}>
                <line x1={point.x} y1={point.y} x2={point.x + marker.dx} y2={point.y + marker.dy} stroke={color} strokeWidth=".8" strokeOpacity=".45" />
                <circle cx={point.x} cy={point.y} r={index === 0 ? 4 : 2.8} fill={color} stroke="white" strokeWidth="1.5" />
              </g>;
            })}
          </svg>
          {places.map((place, index) => {
            const point = project(place.lat, place.lng);
            const marker = markerStyles[place.label];
            const isActive = selected === index;
            return <button
              key={place.label}
              type="button"
              aria-label={`${place.label}${index === 0 ? ", our home" : ", highlight export route"}`}
              aria-pressed={isActive}
              onClick={() => { setSelected(index); setOpen(true); }}
              aria-expanded={isActive && open}
              aria-controls="export-market-card"
              className={`group/flag absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#62bd46] ${isActive ? "z-20" : "z-10 hover:z-20"}`}
              style={{ left: `${(point.x + marker.dx) / 10}%`, top: `${(point.y + marker.dy + 55) / 550 * 100}%`, "--flag-delay": `${index * -.23}s` } as CSSProperties}
            >
              <span className={`absolute inset-0 rounded-full bg-[#62bd46]/15 ${isActive ? "animate-[export-pin-pulse_2.8s_ease-out_infinite] motion-reduce:animate-none" : "opacity-0"}`} />
              <span className={`relative block [animation-delay:var(--flag-delay)] [animation-play-state:var(--map-play-state,running)] motion-safe:animate-[export-flag-float_4s_ease-in-out_infinite]`}>
                <span aria-hidden="true" className={`grid size-9 max-[760px]:size-7 max-[480px]:size-6 place-items-center rounded-full bg-white/95 text-[25px] max-[760px]:text-[17px] max-[480px]:text-[12px] leading-none shadow-[0_3px_16px_#294b1a1c] transition-transform duration-300 group-hover/flag:scale-125 group-focus-visible/flag:scale-125 ${isActive ? "scale-110" : "scale-100"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://flagcdn.com/w80/${marker.flag}.png`} alt="" width={28} height={20} className="h-[55%] w-[72%] rounded-[2px] object-contain" draggable={false} />
                </span>
              </span>
            </button>;
          })}
          {open && (
            <div ref={popupRef} className="absolute z-30 w-[min(250px,calc(100%_-_16px))] -translate-x-1/2 mt-6" style={{ left: `clamp(min(125px, 50%), ${(activePoint.x + activeMarker.dx) / 10}%, max(50%, calc(100% - 125px)))`, top: `${(activePoint.y + activeMarker.dy + 55) / 550 * 100}%` }}>
            <div id="export-market-card" key={activePlace.label} className="export-market-card overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_50px_#183b2526]" role="region" aria-label={`${activePlace.label} export market`}>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close country details" className="absolute right-2 top-2 z-10 grid size-9 max-[600px]:size-11 place-items-center rounded-full bg-white/95 text-xl text-[#26352a] shadow-sm">&times;</button>
              <div className="flex h-28 max-[600px]:h-20 items-center justify-center bg-[#f0f5ed] p-5 max-[600px]:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/w320/${markerStyles[activePlace.label].flag}.png`} alt={`${activePlace.label} flag`} width={160} height={96} className="max-h-full w-auto max-w-full rounded object-contain shadow-sm" />
              </div>
              <div className="p-4">
                <p className="mb-1 text-[10px] font-medium tracking-[.16em] text-[#518840]">{selected === 0 ? "OUR HOME" : "EXPORT DESTINATION"}</p>
                <h3 className="text-base font-semibold text-[#26352a]">{activePlace.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#687269]">{activePlace.body}</p>
                <a href={activePlace.ctaLink} className="mt-3 inline-flex text-xs font-medium text-[#438832] underline underline-offset-4">{activePlace.ctaLabel} &rarr;</a>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
