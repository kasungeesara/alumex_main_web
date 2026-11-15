"use client";

import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import SideRays from "./SideRays";
import { ArrowUpRight, Check, ChevronLeft, LoaderCircle, RotateCcw, Send, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { demoReply, validateDemoInquiry } from "@/lib/aluq/demo";
import { nextInquiryStep, validateInquiryAnswer } from "@/lib/aluq/inquiry-conversation";
import { emptyRequirements, type CatalogProduct, type DisplayMessage, type InquiryDraft, type Requirements, type SiteTopic } from "@/types/aluq";

const initialMessage: DisplayMessage = { id: "welcome", role: "assistant", content: "Hi, I’m ALUQ. Ask me about Alumex, our products, finishes, export markets or contact details. I can also help you prepare a product inquiry.", quickReplies: ["Sliding window for my house", "Company details", "Available finishes", "Export markets", "Browse catalogue"] };
const fieldLabels: Record<keyof Requirements, string> = { productType: "Product type", application: "Application", installationArea: "Installation area", finish: "Preferred finish", dimensions: "Dimensions (include units)", additionalRequirements: "Additional requirements" };
type View = "chat" | "catalogue" | "inquiry";

export default function ChatWindow({ products, topics, open, onClose }: { products: CatalogProduct[]; topics: SiteTopic[]; open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<DisplayMessage[]>([initialMessage]);
  const [pendingReply, setPendingReply] = useState<{ message: DisplayMessage; finishInquiry?: boolean } | null>(null);
  const [requirements, setRequirements] = useState<Requirements>({ ...emptyRequirements });
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [view, setView] = useState<View>("chat");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState<InquiryDraft["customer"]>({ name: "", email: "", phone: "", location: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [skippedFields, setSkippedFields] = useState(new Set<string>());
  const panel = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const submissionLock = useRef(false);

  useEffect(() => {
    if (!preparing) return;
    // A local preview transition, not a simulated network delivery.
    const timer = window.setTimeout(() => {
      setReceipt(`DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
      setPreparing(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [preparing]);

  useEffect(() => {
    if (!pendingReply) return;
    const delay = Math.min(1500, 750 + pendingReply.message.content.length * 5);
    const timer = window.setTimeout(() => {
      setMessages(current => [...current, pendingReply.message]);
      if (pendingReply.finishInquiry) setView("inquiry");
      setPendingReply(null);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [pendingReply]);

  useEffect(() => {
    if (open) {
      if (view === "chat") inputRef.current?.focus({ preventScroll: true });
      else panel.current?.focus({ preventScroll: true });
    }
  }, [open, view]);
  useEffect(() => {
    if (open && view === "chat") logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "instant" });
  }, [messages, pendingReply, open, view]);

  function send(value: string) {
    const content = value.trim();
    if (!content || content.length > 2000 || receipt || preparing || pendingReply) return;
    if (/^review inquiry$/i.test(content)) { setCollecting(false); setView("inquiry"); setInput(""); return; }
    if (collecting) {
      const user: DisplayMessage = { id: crypto.randomUUID(), role: "user", content };
      if (/^cancel$/i.test(content)) {
        setCollecting(false); setInput("");
        setMessages([...messages, user]);
        setPendingReply({ message: { id: crypto.randomUUID(), role: "assistant", content: "I’ve kept your details. You can review your inquiry or continue exploring.", quickReplies: ["Review inquiry", "Browse catalogue"] } });
        return;
      }
      const step = nextInquiryStep(requirements, customer, consent, skippedFields);
      if (!step) { setCollecting(false); setView("inquiry"); return; }
      const problem = validateInquiryAnswer(step, content);
      if (problem) {
        setMessages([...messages, user]);
        setPendingReply({ message: { id: crypto.randomUUID(), role: "assistant", content: problem, quickReplies: step.options } });
        setInput(""); return;
      }
      const nextCustomer = { ...customer };
      const nextRequirements = { ...requirements };
      const nextSkipped = new Set(skippedFields);
      let nextConsent = consent;
      if (step.optional && /^(skip|not sure|no|none)$/i.test(content)) nextSkipped.add(step.id);
      else if (step.scope === "customer") nextCustomer[step.field as keyof typeof nextCustomer] = content;
      else if (step.scope === "requirements") nextRequirements[step.field as keyof Requirements] = content;
      else nextConsent = true;
      setCustomer(nextCustomer); setRequirements(nextRequirements); setConsent(nextConsent);
      setSkippedFields(nextSkipped);
      const next = nextInquiryStep(nextRequirements, nextCustomer, nextConsent, nextSkipped);
      setMessages([...messages, user]);
      setPendingReply({ message: { id: crypto.randomUUID(), role: "assistant", content: next?.question ?? "Thanks, your inquiry details are ready. Review the summary, edit anything you need, then submit the preview.", quickReplies: next ? next.options ?? (next.optional ? ["Skip", "Cancel"] : ["Cancel"]) : ["Review inquiry"] }, finishInquiry: !next });
      setInput(""); setError("");
      if (!next) setCollecting(false);
      return;
    }
    if (/browse catalogue/i.test(content)) { setView("catalogue"); setInput(""); return; }
    const user: DisplayMessage = { id: crypto.randomUUID(), role: "user", content };
    const history = [...messages, user];
    const reply = demoReply(history, requirements, products, topics);
    setMessages(history);
    setPendingReply({ message: { id: crypto.randomUUID(), role: "assistant", content: reply.message, quickReplies: reply.quickReplies, recommendations: reply.recommendations, links: reply.links } });
    setRequirements(reply.requirements);
    setInput("");
    setError("");
  }
  function addProduct(slug: string) {
    if (preparing || pendingReply) return;
    if (!selected.includes(slug) && selected.length >= 4) { setError("You can compare or inquire about up to four ranges at a time."); return; }
    if (!selected.includes(slug)) setSelected([...selected, slug]);
    const next = nextInquiryStep(requirements, customer, consent, skippedFields);
    if (next) {
      setCollecting(true); setView("chat");
      setPendingReply({ message: { id: crypto.randomUUID(), role: "assistant", content: next.question, quickReplies: next.options ?? (next.optional ? ["Skip", "Cancel"] : ["Cancel"]) } });
    } else setView("inquiry");
    setReceipt(null);
    submissionLock.current = false;
    setError("");
  }
  function reset() {
    setPendingReply(null);
    setCollecting(false); setSkippedFields(new Set());
    setPreparing(false);
    setMessages([initialMessage]); setRequirements({ ...emptyRequirements }); setSelected([]); setInput(""); setView("chat"); setReceipt(null); setCustomer({ name: "", email: "", phone: "", location: "", message: "" }); setConsent(false); setError(""); submissionLock.current = false;
  }
  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current || receipt) return;
    const problem = validateDemoInquiry({ productSlugs: selected, requirements, customer, consent, website: "" }, products);
    if (problem) { setError(problem); return; }
    submissionLock.current = true;
    setError("");
    setPreparing(true);
    // Intentionally no request, persistence or CRM action. Data lives only in this widget's memory.
  }
  function productCard(product: CatalogProduct, reason?: string, showSpecs = false) {
    const added = selected.includes(product.slug);
    return <article className="aluq-product" key={product.slug}>
      <div className="aluq-product-image"><Image src={product.image.src} alt={product.image.alt} fill sizes="(max-width: 480px) 70vw, 320px" /></div>
      <div className="aluq-product-copy">
        <h3>{product.name}</h3><p>{product.summary}</p>
        {reason && <p className="aluq-product-reason">{reason}</p>}
        <details open={showSpecs}><summary>Published specifications</summary>{product.specifications.map(spec => <div className="aluq-spec" key={spec.title}><strong>{spec.title}</strong><Markdown>{spec.content}</Markdown></div>)}</details>
        <div className="aluq-product-actions"><Link href={product.href} onClick={onClose}>View product <ArrowUpRight size={14} /></Link><button type="button" disabled={Boolean(pendingReply) || preparing} onClick={() => addProduct(product.slug)}>{added ? <><Check size={13} /> Added · Review</> : "+ Add to inquiry"}</button></div>
      </div>
    </article>;
  }
  const latest = messages.at(-1);
  const inquiryStep = collecting ? nextInquiryStep(requirements, customer, consent, skippedFields) : undefined;

  return <section ref={panel} id="aluq-chat" className="aluq-panel" role="dialog" aria-label="ALUQ product assistant" tabIndex={-1} data-lenis-prevent onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
    <header className="aluq-header">
      <SideRays className="aluq-banner-rays" rayColor1="#62bd46" rayColor2="#62bd46" />
      <div className="aluq-brand">
        <Image src="/images/home/logo-original.png" alt="Alumex" width={110} height={22} className="aluq-brand-logo" />
        <div className="aluq-brand-caption"><h2>ALUQ <span>Assistant</span></h2><p><i /> Product guide</p></div>
      </div>
      <button type="button" onClick={reset} aria-label="Start a new conversation" title="Start over"><RotateCcw size={16} /></button><button type="button" onClick={onClose} aria-label="Close ALUQ"><X size={20} /></button>
    </header>
    <nav className="aluq-tabs" aria-label="Assistant sections"><button type="button" disabled={preparing} aria-current={view === "chat" ? "page" : undefined} onClick={() => setView("chat")}>Conversation</button><button type="button" disabled={preparing} aria-current={view === "catalogue" ? "page" : undefined} onClick={() => setView("catalogue")}>Catalogue</button><button type="button" disabled={preparing} aria-current={view === "inquiry" ? "page" : undefined} onClick={() => setView("inquiry")}><ShoppingBag size={13} /> Inquiry {selected.length ? `(${selected.length})` : ""}</button></nav>
    {error && <p className="aluq-error" role="alert">{error}</p>}
    {view === "chat" && <>
      <div ref={logRef} className="aluq-body aluq-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation">
        {messages.map(message => <div key={message.id} className={`aluq-message aluq-message-${message.role}`}>
          {message.role === "assistant" && <span className="aluq-message-author">ALUQ</span>}
          <p>{message.content}</p>
          {message.links?.map(link => <Link key={link.href} href={link.href} className="aluq-knowledge-link" onClick={onClose}>{link.title} <ArrowUpRight size={14} /></Link>)}
          {message.recommendations?.map(recommendation => {
            const product = products.find(item => item.slug === recommendation.slug);
            return product ? productCard(product, recommendation.reason, /compare/i.test(message.content)) : null;
          })}
        </div>)}
        {pendingReply && <div className="aluq-message aluq-message-assistant aluq-typing" role="status" aria-label="ALUQ is typing"><span className="aluq-message-author" aria-hidden="true">ALUQ</span><span className="aluq-typing-dots" aria-hidden="true"><i /><i /><i /></span></div>}
        {!pendingReply && !receipt && latest?.quickReplies && <div className="aluq-quick-replies">{latest.quickReplies.map(reply => <button key={reply} type="button" onClick={() => send(reply)}>{reply}</button>)}</div>}
        {receipt && <p className="aluq-success" role="status">Demo inquiry prepared ({receipt}). Nothing was sent. Start a new conversation to try again.</p>}
      </div>
      <form className="aluq-composer" onSubmit={event => { event.preventDefault(); send(input); }}><label htmlFor="aluq-message" className="sr-only">Your message</label><input ref={inputRef} id="aluq-message" value={input} onChange={event => setInput(event.target.value)} maxLength={inquiryStep?.max ?? 1000} inputMode={inquiryStep?.id === "email" ? "email" : inquiryStep?.id === "phone" ? "tel" : "text"} placeholder={collecting ? "Type your answer…" : "Tell us what you’re looking for…"} autoComplete="off" disabled={Boolean(receipt)} /><button type="submit" disabled={!input.trim() || Boolean(receipt) || Boolean(pendingReply)} aria-label="Send message"><Send size={17} /></button></form>
    </>}
    {view === "catalogue" && <div className="aluq-body"><div className="aluq-view-intro"><h3>Explore Alumex ranges</h3><p>Actual products and specifications from this website. Add ranges to your inquiry to compare your choices.</p></div>{products.map(product => productCard(product))}</div>}
    {view === "inquiry" && <div className="aluq-body">
      {preparing ? <div className="aluq-inquiry-progress" role="status" aria-live="polite">
        <LoaderCircle size={34} aria-hidden="true" />
        <h3>Preparing your inquiry preview</h3>
        <p>Organising your selected products and project details.</p>
        <div className="aluq-progress-track" aria-hidden="true"><span /></div>
        <small>Preview only — no email or inquiry is being sent.</small>
      </div> : <>
      {receipt ? <div className="aluq-receipt" role="status"><Check size={32} /><h3>Demo inquiry complete</h3><p>Your inquiry was prepared in this tab only. It has not been sent to Alumex or stored on a server.</p><strong>{receipt}</strong><p>For a real inquiry, email <a href="mailto:info@alumexgroup.com">info@alumexgroup.com</a> or call <a href="tel:+94112403333">+94 11 240 3333</a>.</p><button type="button" className="aluq-primary" onClick={reset}>Try another demo</button></div> : !selected.length ? <div className="aluq-empty"><ShoppingBag size={28} /><h3>Your inquiry starts here</h3><p>Add a product range from the conversation or catalogue, then review your requirements.</p><button type="button" className="aluq-primary" onClick={() => setView("catalogue")}>Explore the catalogue <ArrowUpRight size={15} /></button></div> : <form onSubmit={submitDemo} className="aluq-inquiry">
        <div className="aluq-view-intro"><h3>Review your inquiry</h3><p>Edit anything below. This is a demo: use sample contact details. Nothing will be sent or saved outside this tab.</p></div>
        <fieldset><legend>Selected ranges</legend>{selected.map(slug => { const product = products.find(item => item.slug === slug)!; return <div className="aluq-selected" key={slug}><span>{product.name}</span><button type="button" aria-label={`Remove ${product.name}`} onClick={() => setSelected(selected.filter(value => value !== slug))}><X size={16} /></button></div>; })}<button type="button" className="aluq-text-button" onClick={() => setView("catalogue")}>+ Add another range</button></fieldset>
        <fieldset><legend>Project requirements</legend>{Object.entries(fieldLabels).map(([key, label]) => <label key={key}>{label}{key === "additionalRequirements" ? <textarea value={requirements[key]} onChange={event => setRequirements({ ...requirements, [key]: event.target.value })} maxLength={1500} rows={2} /> : <input value={requirements[key as keyof Requirements]} onChange={event => setRequirements({ ...requirements, [key]: event.target.value })} maxLength={200} placeholder="Not specified" />}</label>)}</fieldset>
        <fieldset><legend>Contact details · demo only</legend>{([ ["name", "Customer name", "text"], ["email", "Email address", "email"], ["phone", "Phone number", "tel"], ["location", "Project location", "text"] ] as const).map(([key, label, type]) => <label key={key}>{label}<input type={type} required value={customer[key]} onChange={event => setCustomer({ ...customer, [key]: event.target.value })} maxLength={key === "email" ? 254 : key === "phone" ? 40 : 200} autoComplete="off" /></label>)}<label>Additional message<textarea value={customer.message} onChange={event => setCustomer({ ...customer, message: event.target.value })} maxLength={2000} rows={3} /></label></fieldset>
        <label className="aluq-consent"><input type="checkbox" checked={consent} required onChange={event => setConsent(event.target.checked)} /><span>I understand this is a demo and my inquiry will not be sent.</span></label>
        <button type="submit" className="aluq-primary">Submit demo inquiry <ArrowUpRight size={16} /></button><button type="button" className="aluq-text-button" onClick={() => setView("chat")}><ChevronLeft size={14} /> Back to conversation</button>
      </form>}
      {receipt && <div className="aluq-receipt-summary">
        <h4>Your inquiry summary</h4>
        <dl>
          <div><dt>Customer</dt><dd>{customer.name}</dd></div>
          <div><dt>Selected ranges</dt><dd>{selected.map(slug => products.find(product => product.slug === slug)?.name).join(", ")}</dd></div>
          <div><dt>Project location</dt><dd>{customer.location}</dd></div>
          {requirements.finish && <div><dt>Preferred finish</dt><dd>{requirements.finish}</dd></div>}
          {requirements.dimensions && <div><dt>Dimensions</dt><dd>{requirements.dimensions}</dd></div>}
        </dl>
      </div>}
      </>}
    </div>}
    <footer className="aluq-footer">Guided preview · Inquiries aren’t sent.<br />ALUQ by Alumex</footer>
  </section>;
}
