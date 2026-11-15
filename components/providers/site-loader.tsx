"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export function SiteLoader() {
  const path = usePathname();
  const [visible, setVisible] = useState(path === "/");
  const [exit, setExit] = useState(false);
  useEffect(() => {
    if (path !== "/") return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fade = window.setTimeout(() => setExit(true), reduce ? 100 : 1600);
    const remove = window.setTimeout(() => setVisible(false), reduce ? 100 : 2500);
    return () => { clearTimeout(fade); clearTimeout(remove); };
  }, [path]);
  if (!visible || path !== "/") return null;
  return <div className={`era-loader ${exit ? 'era-loader-exit' : ''}`} role="status" aria-label="Loading Alumex"><div className="era-frame" /><span className="era-loader-star" aria-hidden="true">✳</span><div className="era-loader-title">ALUMEX<span>Precision in every profile.</span></div><span className="era-loader-line" /><p>ULTIMATE IN ALUMINIUM PROFILES</p></div>;
}
