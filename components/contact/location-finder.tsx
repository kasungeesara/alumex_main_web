"use client";

import { useRef, useState } from "react";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { locations, type LocationCategory } from "@/lib/locations";
import styles from "@/app/contact-us/contact.module.css";

const categories: { value: LocationCategory; label: string }[] = [
  { value: "warehouses", label: "Warehouses" },
  { value: "dealers", label: "Dealers" },
  { value: "experts", label: "Lumin Experts" },
  { value: "concept-centers", label: "Lumin Concept Centers" },
];

export function LocationFinder() {
  const [category, setCategory] = useState<LocationCategory>("warehouses");
  const [selectedId, setSelectedId] = useState("head-office");
  const list = useRef<HTMLDivElement>(null);
  const visible = locations.filter(location => location.category === category);
  const selected = visible.find(location => location.id === selectedId) || visible[0];
  const categoryLabel = categories.find(item => item.value === category)?.label;
  const selectedQuery = encodeURIComponent(`${selected.name}, ${selected.address}, Sri Lanka`);
  const selectedMapUrl = selected.map || `https://www.google.com/maps/search/?api=1&query=${selectedQuery}`;

  return <section className={styles.locator} aria-labelledby="locations-title">
    <div className={styles.locatorHeader}>
      <p className={styles.sectionLabel}><span />OUR NETWORK</p>
      <h2 id="locations-title">Closer to you,<br /><span>wherever you build.</span></h2>
      <p className={styles.locatorIntro}>Find your nearest warehouse, dealer or LUMIN specialist. Select a location to explore the map and get directions.</p>
      <div className={styles.locationTabs} role="group" aria-label="Location category">
        {categories.map(item => <button type="button" key={item.value} aria-pressed={category === item.value} aria-controls="location-list" onClick={() => { setCategory(item.value); setSelectedId(locations.find(location => location.category === item.value)!.id); list.current?.scrollTo({ top: 0 }); }}>{item.label}</button>)}
      </div>
    </div>
    <div className={styles.locatorLeft}>
      <p className={styles.resultCount}>{visible.length} {categoryLabel} locations</p>
      <p className={styles.srOnly} role="status">{visible.length} {categoryLabel} locations</p>
      <div id="location-list" className={styles.locationList} ref={list} data-lenis-prevent tabIndex={0} role="region" aria-label={`${categoryLabel} directory`}>
        {visible.map(location => {
          const mapUrl = location.map || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name}, ${location.address}`)}`;
          return <article key={location.id} id={location.id} className={`${styles.locationCard} ${location.id === selected.id ? styles.selectedLocation : ""}`}>
            <button type="button" aria-pressed={location.id === selected.id} onClick={() => setSelectedId(location.id)} className={styles.locationSelect}><MapPin size={21} aria-hidden="true" /><span><strong>{location.name}</strong>{location.address && <span className={styles.cardAddress}>{location.address}</span>}</span></button>
            <div className={styles.locationActions}>{location.phone && <a href={`tel:${location.phone.replace(/\s/g, "")}`}><Phone size={13} aria-hidden="true" />{location.phone}</a>}<a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${location.name}`}>Directions <ExternalLink size={13} aria-hidden="true" /></a></div>
          </article>;
        })}
      </div>
    </div>
    <div className={styles.locatorRight}>
      <iframe key={selected.id} className={styles.directoryMap} title={`Map showing ${selected.name}`} src={`https://www.google.com/maps?q=${selectedQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <div className={styles.selectedInfo}>
        <span className={styles.selectedBadge}>{categoryLabel}</span>
        <h3>{selected.name}</h3><p>{selected.address}</p>
        <div className={styles.selectedLinks}>
          {selected.phone && <a href={`tel:${selected.phone.replace(/\s/g, "")}`}><Phone size={15} aria-hidden="true" />Call location</a>}
          {selected.email && <a href={`mailto:${selected.email}`}><Mail size={15} aria-hidden="true" />Email</a>}
          <a className={styles.directionsButton} href={selectedMapUrl} target="_blank" rel="noopener noreferrer">Get directions <ExternalLink size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}
