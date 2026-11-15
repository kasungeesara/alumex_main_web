"use client";
import { useEffect, useState } from "react";
import { Boxes, Layers, Paintbrush, Waves, Gem, Factory } from "lucide-react";
import { Eyebrow } from "./shared";
const finishes = [
  {
    name: "Mill Finish",
    icon: Boxes,
    text: "High-performance aluminium extrusions for architectural, industrial, and residential solutions.",
  },
  {
    name: "Powder Coating",
    image: "/images/home/powder.webp",
    icon: Paintbrush,
    text: "Durable, beautifully finished aluminium with a wide choice of colours. Our advanced powder coating creates a protective finish for architectural and residential applications.",
  },
  {
    name: "Anodizing",
    image: "/images/home/anodizing.jpg",
    icon: Layers,
    text: "A refined, durable surface that enhances the natural beauty of aluminium, with excellent resistance to corrosion and wear.",
  },
  {
    name: "Wood Finish (Woodex)",
    image: "/images/home/wood.webp",
    icon: Waves,
    text: "The warmth and character of wood with the strength and durability of aluminium. Discover beautiful finishes for contemporary spaces.",
  },
  {
    name: "Satin Finish",
    image: "/images/home/satin.jpg",
    icon: Factory,
    text: "A smooth, softly brushed aluminium finish with a subtle sheen, bringing a refined look to architectural and interior applications.",
  },
  {
    name: "Value Addition",
    image: "/images/home/value.jpeg",
    icon: Gem,
    text: "Custom fabrication and precision finishing to take your aluminium profiles from concept to a complete solution.",
  },
];
export function Manufacturing() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % finishes.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [active]);
  return (
    <section
      id="manufacturing"
      className="manufacturing section-container py-[72px_88px] max-[600px]:py-[48px_56px] max-[600px]:[&_h2_br]:hidden w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto"
    >
      <Eyebrow>Manufacturing</Eyebrow>
      <h2>
        Sri Lanka&apos;s Foremost Aluminium <br />
        <span>Extrusion Manufacturer.</span>
      </h2>
      <p className="intro-copy mt-5.5 text-[16px] leading-[1.75] max-[600px]:text-[15px] max-[600px]:mt-5 max-w-195 text-[var(--muted)]">
        Alumex PLC is Sri Lanka&apos;s foremost aluminium extrusion
        manufacturer, producing best-in-class commercial, industrial,
        residential and architectural profiles that shape industries across the
        country and around the world.
      </p>
      <div className="finish-layout grid-cols-[minmax(230px,_.9fr)_minmax(0,_2fr)] gap-16 mt-12 max-[1150px]:gap-8 max-[960px]:grid-cols-[210px_minmax(0,1fr)] max-[960px]:gap-7 max-[600px]:grid-cols-[1fr] max-[600px]:gap-6 max-[600px]:mt-8 grid">
        <div
          className="finish-tabs flex-col flex gap-3 pr-9 [&_button]:[border:0] [&_button]:text-[#999] [&_button]:pt-2.5 [&_button]:pr-0 [&_button]:pb-2.5 [&_button]:pl-0 [&_button]:text-[15px] [&_button[aria-selected=true]]:text-[#333] [&_button[aria-selected=true]]:font-semibold [&_svg]:w-4.5 [&_svg]:h-4.5 [&_svg]:text-[#b6b6b6] [&_button[aria-selected=true]_svg]:text-[var(--green)] max-[960px]:pr-0 max-[600px]:grid max-[600px]:grid-cols-[1fr_1fr] max-[600px]:gap-[8px_24px] max-[600px]:[&_button]:text-[13px] max-[600px]:[&_button]:py-3 max-[600px]:[&_button]:[border-bottom:1px_solid_#eee] justify-between"
          role="tablist"
          aria-label="Aluminium finishes"
        >
          {finishes.map((finish, i) => (
            <button
              key={finish.name}
              role="tab"
              aria-selected={active === i}
              aria-controls="finish-panel"
              onClick={() => setActive(i)}
              className="flex justify-between items-center gap-3.5 bg-transparent text-left"
            >
              {finish.name}
              <finish.icon size={20} />
            </button>
          ))}
        </div>
        <div
          id="finish-panel"
          className="finish-panel min-h-80 max-[600px]:min-h-70 grid overflow-hidden bg-[#f3f4f3] rounded-[12px]"
          role="tabpanel"
          style={{ backgroundImage: `url("${finishes[active].image ?? "/images/home/millfinish.jpg"}"), url("/images/home/millfinish.jpg")` }}
        >
          <div className="finish-description p-7.5 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mr-0 [&_h3]:mb-4 [&_h3]:ml-0 [&_p]:text-[15px] [&_p]:leading-[1.7] max-[1150px]:pt-6 max-[1150px]:pr-6 max-[1150px]:pb-6 max-[1150px]:pl-6 max-[600px]:pt-5 max-[600px]:pr-5 max-[600px]:pb-5 max-[600px]:pl-5 max-[600px]:[&_h3]:text-[19px] max-[600px]:[&_p]:text-[13px]">
            <span className="finish-number text-[13px] text-[var(--green)] font-semibold">
              0{active + 1}
            </span>
            <h3>
              {finishes[active].name}
            </h3>
            <p className="text-[var(--muted)]">{finishes[active].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
