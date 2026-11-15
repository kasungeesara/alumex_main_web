"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/about";
import styles from "@/app/about-us/about.module.css";

export function PeopleCarousel({ id, title, accent, people }: { id: string; title: string; accent: string; people: TeamMember[] }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 550px)");
    const tablet = window.matchMedia("(max-width: 1000px)");
    const update = () => { setPageSize(mobile.matches ? 1 : tablet.matches ? 2 : 4); setPage(0); };
    update();
    mobile.addEventListener("change", update); tablet.addEventListener("change", update);
    return () => { mobile.removeEventListener("change", update); tablet.removeEventListener("change", update); };
  }, []);
  const pageCount = Math.ceil(people.length / pageSize);
  const currentPage = Math.min(page, pageCount - 1);
  const shown = people.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  return <section className={styles.teamSection} aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{title} <span>{accent}</span></h2>
    <div className={styles.peopleGrid} id={`${id}-people`}>
      {shown.map(person => <article className={styles.personCard} key={person.name}>
        <div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 550px) 160px, 150px" quality={90} className={styles.portraitImage} /></div>
        <h3>{person.name}</h3><p>{person.role}</p>
      </article>)}
    </div>
    <div className={styles.carouselControls}>
      <button type="button" aria-label={`Previous ${id} page`} aria-controls={`${id}-people`} disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}><ArrowLeft size={21} /></button>
      <div className={styles.pagination}>{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} aria-label={`Show ${id} page ${index + 1}`} aria-current={currentPage === index ? "true" : undefined} onClick={() => setPage(index)} />)}</div>
      <button type="button" aria-label={`Next ${id} page`} aria-controls={`${id}-people`} disabled={currentPage === pageCount - 1} onClick={() => setPage(currentPage + 1)}><ArrowRight size={21} /></button>
      <p className={styles.srOnly} role="status">Page {currentPage + 1} of {pageCount}, {shown.map(person => person.name).join(", ")}</p>
    </div>
  </section>;
}
