"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CatalogProduct, SiteTopic } from "@/types/aluq";
import "./aluq.css";

const ChatWindow = dynamic(() => import("./chat-window"), { ssr: false, loading: () => <div className="aluq-loading" role="status">Opening ALUQ…</div> });

export function AluqLauncher({ products, topics }: { products: CatalogProduct[]; topics: SiteTopic[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => () => { if (hideTimer.current !== null) window.clearTimeout(hideTimer.current); }, []);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
    } else {
      hideTimer.current = window.setTimeout(() => { setVisible(false); hideTimer.current = null; }, 260);
    }
  };
  const show = () => {
    if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    hideTimer.current = null;
    setMounted(true);
    setVisible(true);
    setOpen(true);
  };

  return <div className="aluq-widget">
    {mounted && <div className={`aluq-window${open ? "" : " aluq-window-closing"}`} hidden={!visible} inert={!open} aria-hidden={!open}><ChatWindow products={products} topics={topics} open={open} onClose={close} /></div>}
    <button ref={trigger} type="button" className="aluq-launcher" data-aluq-open aria-label={open ? "Close ALUQ assistant" : "Ask ALUQ — open product assistant"} aria-expanded={open} aria-controls={mounted ? "aluq-chat" : undefined} onClick={() => {
      if (open) close();
      else show();
    }}>
      <svg width="24" height="29" viewBox="0 0 48 58" fill="none" aria-hidden="true"><path d="M2 2h44v54H2zM8 8h32v42H8zM14 14h20v30H14z" stroke="currentColor" strokeWidth="3" /></svg>
      <span aria-hidden={open}><span className="aluq-online-dot" aria-hidden="true" />Ask ALUQ</span>
    </button>
  </div>;
}
