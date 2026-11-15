"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { slidingProducts } from "@/data/sliding-products";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import styles from "./product-range.module.css";


export function ProductRange({ categories }: { categories: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const triggerId = `${panelId}-trigger`;

  return <div className={styles.explorer}>
    <div className={styles.categories}>
      {categories.map((name, index) => {
        const isSliding = name === "Slidings";
        const content = <>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.name}>{name}{isSliding && <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />}</span>
          {isSliding && <span className={styles.meta}>7 products · {expanded ? "Hide range" : "Explore range"}</span>}
        </>;
        return isSliding ? <button key={name} id={triggerId} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(value => !value)} className={`${styles.category} ${styles.interactive} ${expanded ? styles.selected : ""}`}>{content}</button> : <div key={name} className={styles.category}>{content}</div>;
      })}
    </div>
    <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded} className={styles.panel}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Explore the collection</p>
          <h3 className={styles.title}>Sliding &amp; Folding Systems</h3>
          <p className={styles.intro}>Discover the seven options in our Slidings range.</p>
        </div>
        <button type="button" aria-label="Close Slidings range" onClick={() => { setExpanded(false); document.getElementById(triggerId)?.focus(); }} className={styles.close}><X size={18} aria-hidden="true" /></button>
      </div>
      <ul className={styles.products}>
        {slidingProducts.map((product, index) => <li key={product.slug}><span className={styles.productNumber}>{String(index + 1).padStart(2, "0")}</span><h4>{product.name}</h4><Link className={styles.productLink} href={`/products/architectural/slidings/${product.slug}`} aria-label={`View ${product.name}`}>View product<ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}
      </ul>
    </div>
  </div>;
}
