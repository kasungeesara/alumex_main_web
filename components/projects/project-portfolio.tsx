"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { setScrollLocked } from "@/lib/scroll";
import { projects, type Project } from "@/lib/projects";

export function ProjectPortfolio() {
  const [category, setCategory] = useState<Project["category"]>("commercial");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    return () => {
      document.body.style.overflow = previousOverflow;
      setScrollLocked(false);
    };
  }, [selected]);
  const visibleProjects = projects.filter(project => project.category === category);

  return <>
    <div role="group" aria-label="Project category" className="mt-12 flex flex-wrap justify-center gap-5 max-[700px]:mt-8 max-[700px]:gap-3">
      {(["commercial", "residential"] as const).map(value => <button key={value} type="button" aria-pressed={category === value} aria-controls="portfolio-grid" onClick={() => setCategory(value)} className={`min-h-14 rounded-lg border px-5 text-base font-semibold transition-colors max-[700px]:px-4 max-[700px]:text-sm ${category === value ? "border-[#76c35c] bg-[#76c35c] text-white" : "border-[#292929] bg-white text-[#202020] hover:border-[#62bd46] hover:text-[#40832e]"}`}>
        {value === "commercial" ? "Commercial Projects" : "Residential Projects"}
      </button>)}
    </div>
    <p role="status" className="sr-only">{visibleProjects.length} {category} projects</p>
    <div id="portfolio-grid" className="mt-20 grid grid-cols-3 gap-x-14 gap-y-12 max-[1100px]:gap-7 max-[800px]:grid-cols-2 max-[700px]:mt-10 max-[700px]:gap-5 max-[480px]:grid-cols-1">
      {visibleProjects.map((project, index) => {
        const className = "group relative isolate block aspect-square overflow-hidden rounded-[14px] bg-[#e8ece5] text-left outline-offset-4";
        const content = <>
        <Image src={project.image} alt={project.name} fill sizes="(max-width: 480px) 90vw, (max-width: 800px) 44vw, 30vw" priority={index < 3} className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 max-[1100px]:p-5">
          <span className="text-[clamp(18px,1.8vw,25px)] font-semibold leading-snug text-white">{project.name}</span>
          <span aria-hidden="true" className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-[#62bd46] transition-colors group-hover:bg-[#62bd46] group-hover:text-white max-[1100px]:size-12"><ArrowRight size={24} strokeWidth={1.5} /></span>
        </span>
        </>;
        return project.href
          ? <Link key={project.image} href={project.href} aria-label={`View ${project.name}`} className={className}>{content}</Link>
          : <button key={project.image} type="button" onClick={() => { setSelected(project); dialog.current?.showModal(); }} aria-label={`View ${project.name}`} className={className}>{content}</button>;
      })}
    </div>
    <dialog ref={dialog} data-lenis-prevent onClose={() => setSelected(null)} aria-labelledby="project-preview-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_32px)] max-w-[900px] overflow-y-auto rounded-2xl border-0 bg-white p-0 text-[#202420] shadow-2xl backdrop:bg-black/70">
      {selected && <>
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <h2 id="project-preview-title" className="!text-xl !font-semibold !leading-snug">{selected.name}</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close project preview" className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f0f3ec] text-[#40832e]"><X size={22} /></button>
        </div>
        <div className="relative aspect-[4/3] bg-[#f0f3ec]"><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 900px) 95vw, 900px" className="object-contain" /></div>
      </>}
    </dialog>
  </>;
}
