"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { milestones } from "@/lib/about";
import styles from "@/app/about-us/about.module.css";

export function CompanyTimeline() {
  const [index, setIndex] = useState(milestones.length - 1);
  const milestone = milestones[index];
  return <section className={styles.timelineSection} aria-labelledby="timeline-title">
    <p className={styles.eyebrow}><span />Timeline</p>
    <h2 id="timeline-title">Our Path to <span>Progress</span></h2>
    <div className={styles.timeline}>
      <div className={styles.timelineCopy}>
        <label htmlFor="milestone-select" className={styles.srOnly}>Select a company milestone</label>
        <select id="milestone-select" value={index} onChange={event => setIndex(Number(event.target.value))}>{milestones.map((item, i) => <option value={i} key={i}>{item.year} — {item.title}</option>)}</select>
        <div role="status"><span className={styles.milestoneYear}>{milestone.year}</span><h3>{milestone.title}</h3><p>{milestone.description}</p></div>
      </div>
      <div className={styles.timelinePhoto}><Image key={milestone.image} src={milestone.image} alt={`${milestone.title}, ${milestone.year}`} fill unoptimized sizes="(max-width: 550px) 85vw, 420px" className={styles.timelineImage} /></div>
    </div>
    <div className={styles.carouselControls}>
      <button type="button" aria-label="Previous milestone" onClick={() => setIndex((index - 1 + milestones.length) % milestones.length)}><ArrowLeft size={21} /></button>
      <span className={styles.timelineCount} aria-live="polite">{String(index + 1).padStart(2, "0")} <span>/ {milestones.length}</span></span><div className={styles.timelinePagination}>{milestones.map((item, i) => <button type="button" key={i} aria-label={`Show ${item.year}: ${item.title}`} aria-current={index === i ? "true" : undefined} onClick={() => setIndex(i)} />)}</div>
      <button type="button" aria-label="Next milestone" onClick={() => setIndex((index + 1) % milestones.length)}><ArrowRight size={21} /></button>
    </div>
  </section>;
}
