"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Building2, CheckCircle2, FileText, Globe2, House, MapPin, Package, MessageSquare, Handshake, X } from "lucide-react";
import styles from "@/app/contact-us/contact.module.css";

const quickInquiries = [
  { label: "Product details", value: "Product information", icon: Package },
  { label: "Get a quote", value: "Request a quote", icon: FileText },
  { label: "Home projects", value: "Residential project", icon: House },
  { label: "Commercial projects", value: "Commercial project", icon: Building2 },
  { label: "Find a dealer", value: "Find a dealer", icon: MapPin },
  { label: "Export inquiries", value: "Exports", icon: Globe2 },
];

export function ContactForm() {
  const [inquiry, setInquiry] = useState("");
  const [showToast, setShowToast] = useState(false);
  const InquiryIcon = quickInquiries.find(item => item.value === inquiry)?.icon
    ?? (inquiry === "Dealer or fabricator support" ? Handshake : MessageSquare);
  useEffect(() => {
    if (!showToast) return;
    const timeout = window.setTimeout(() => setShowToast(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [showToast]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setInquiry("");
    setShowToast(true);
  }
  return <form className={styles.form} onSubmit={submit}>
    <fieldset className={styles.quickInquiries}>
      <legend>How can we help?</legend>
      <div className={styles.quickInquiryButtons}>
        {quickInquiries.map(item => <button key={item.value} type="button" aria-pressed={inquiry === item.value} aria-controls="inquiry" onClick={() => setInquiry(item.value)}><item.icon size={16} strokeWidth={1.6} aria-hidden="true" />{item.label}</button>)}
      </div>
    </fieldset>
    <div className={styles.field}><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" /></div>
    <div className={styles.field}><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" /></div>
    <div className={`${styles.field} ${styles.full}`}><label htmlFor="email">Email</label><input id="email" name="email" autoComplete="email" /></div>
    <div className={styles.field}><label htmlFor="phone">Contact Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
    <div className={styles.field}><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div>
    <div className={styles.field}><label htmlFor="country">Country</label><input id="country" name="country" autoComplete="country-name" list="countries" /><datalist id="countries">{["Sri Lanka", "Australia", "Canada", "India", "Maldives", "New Zealand", "United Arab Emirates", "United Kingdom", "United States"].map(country => <option key={country} value={country} />)}</datalist></div>
    <div className={styles.field}><label htmlFor="inquiry">Inquiry</label><div className={styles.inquirySelect}><InquiryIcon size={16} strokeWidth={1.6} aria-hidden="true" /><select id="inquiry" name="inquiry" value={inquiry} onChange={event => setInquiry(event.target.value)}><option value="">Select inquiry type</option><option>Product information</option><option>Request a quote</option><option>Commercial project</option><option>Residential project</option><option>Find a dealer</option><option>Exports</option><option>Dealer or fabricator support</option><option>Other inquiry</option></select></div></div>
    <div className={`${styles.field} ${styles.full} ${styles.messageField}`}><label htmlFor="message">Tell us a little bit about what you need</label><textarea id="message" name="message" rows={5} /></div>
    <label className={styles.consent}><input type="checkbox" name="marketing" /><span>Please note that your email may be used for marketing purposes. You can choose to opt-out at any time</span></label>
    <button className={styles.submit} type="submit">Send inquiry <ArrowUpRight size={19} aria-hidden="true" /></button>
    <p className={styles.formNote}>Demo form — no information will be submitted.</p>
    {showToast && <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.toastIcon}><CheckCircle2 size={20} aria-hidden="true" /></span>
      <span><strong>Inquiry sent successfully!</strong><small>Thank you. Our team will get back to you shortly.</small></span>
      <button type="button" onClick={() => setShowToast(false)} aria-label="Dismiss notification"><X size={18} aria-hidden="true" /></button>
    </div>}
  </form>;
}

export function NewsletterForm() {
  const [opened, setOpened] = useState(false);
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("newsletterEmail");
    window.location.href = `mailto:info@alumexgroup.com?subject=Newsletter%20subscription%20request&body=${encodeURIComponent(`Please subscribe ${email} to the Alumex newsletter. I consent to receiving email updates.`)}`;
    setOpened(true);
  }
  return <form className={styles.newsletterForm} onSubmit={subscribe}>
    <label htmlFor="newsletterEmail" className={styles.srOnly}>Your email address</label>
    <input type="email" name="newsletterEmail" id="newsletterEmail" required autoComplete="email" placeholder="Enter your email*" aria-describedby="newsletter-delivery" />
    <button type="submit">Subscribe</button>
    <p id="newsletter-delivery" className={styles.newsletterHelp} role={opened ? "status" : undefined}>{opened ? "Send the email draft to request your subscription." : "Opens your email app to request a subscription."}</p>
  </form>;
}
