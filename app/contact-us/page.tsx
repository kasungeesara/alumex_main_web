import type { Metadata } from "next";
import { ProductHeader } from "@/components/products/product-header";
import { Footer } from "@/components/home/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationFinder } from "@/components/contact/location-finder";
import { ArrowUpRight, Building2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Alumex",
  description: "Get in touch with Alumex for aluminium product inquiries. Find our head office, warehouses, dealers, LUMIN experts and concept centers across Sri Lanka.",
};
const headOfficeMap = "https://www.google.com/maps/search/?api=1&query=Alumex+PLC+Pattiwila+Road+Sapugaskanda";

export default function ContactPage() {
  return <>
    <ProductHeader />
    <main className={`${styles.contact} section-container`}>
      <section className={styles.banner} aria-labelledby="contact-title">
        <div><p className={styles.bannerEyebrow}><span />Contact Us</p><h1 id="contact-title">Let&apos;s build something<br /><span>great together.</span></h1><p className={styles.heroCopy}>Talk to our team about your next project.<br />We&apos;re here to help you find the right aluminium solutions.</p></div>
      </section>
      <section className={styles.contactGrid} aria-labelledby="support-title">
        <div className={styles.contactInfo}>
          <p className={styles.sectionLabel}><span />WE&apos;RE HERE TO HELP</p>
          <h2 id="support-title" className={styles.supportTitle}>Real support,<br />from real experts.<br /><span>Anytime you need it.</span></h2>
          <p className={styles.supportCopy}>Have a question or a project in mind? Talk to our team about the right aluminium solutions for you.</p>
          <div className={styles.infoGrid}>
            <div><h3><span className={styles.contactIcon}><Phone size={18} aria-hidden="true" /></span>Call us</h3><a href="tel:+94112400332">+94 11 2400332</a><a href="tel:+94777552992">+94 77 7552992</a></div>
            <div><h3><span className={styles.contactIcon}><MapPin size={18} aria-hidden="true" /></span>Our location</h3><a href={headOfficeMap} target="_blank" rel="noopener noreferrer">Alumex PLC (Head Office)<br />Pattiwila Road,<br />Sapugaskanda <ArrowUpRight size={14} aria-hidden="true" /></a></div>
            <div><h3><span className={styles.contactIcon}><Mail size={18} aria-hidden="true" /></span>Email us</h3><a href="mailto:info@alumexgroup.com">info@alumexgroup.com</a></div>
            <div><h3><span className={`${styles.contactIcon} ${styles.whatsappIcon}`}><MessageCircle size={22} aria-hidden="true" /><Phone size={10} aria-hidden="true" /></span>WhatsApp</h3><a href="https://wa.me/94777552992" target="_blank" rel="noopener noreferrer">+94 77 7552992 <ArrowUpRight size={14} aria-hidden="true" /></a></div>
            <div><h3><span className={styles.contactIcon}><Building2 size={18} aria-hidden="true" /></span>Find your nearest Alumex</h3><a href="#alumex-locations">Explore our locations <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div>
        </div>
        <div className={styles.formPanel}><h2>Get in touch</h2><p>Tell us a little about your project and our team will help you take the next step.</p><ContactForm /></div>
      </section>
      <section className={styles.mapSection} aria-label="Our head office location">
        <div className={styles.mapCaption}><span><MapPin size={17} aria-hidden="true" />Alumex PLC / Sapugaskanda</span><a href={headOfficeMap} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <iframe className={styles.officeMap} title="Alumex PLC head office on Google Maps" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15841.595286323087!2d79.9518235!3d6.9621909!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257b83959dde7%3A0xc02312ba412350c6!2sAlumex%20PLC!5e0!3m2!1sen!2slk!4v1713934610923!5m2!1sen!2slk" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </section>
      <div id="alumex-locations" className={styles.locationDirectory}><LocationFinder /></div>
    </main>
    <Footer homeLinks />
  </>;
}
