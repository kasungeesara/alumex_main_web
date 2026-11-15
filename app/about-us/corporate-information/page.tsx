import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, TrendingUp, MapPin, Phone, Printer, Mail } from "lucide-react";
import { AboutNavigation } from "@/components/about/about-navigation";
import { PeopleCarousel } from "@/components/about/people-carousel";
import { directors, corporateManagement, managementTeam, memberLogos, bankLogos } from "@/lib/about";
import styles from "../about.module.css";

export const metadata: Metadata = {
  title: "Corporate Information | Leadership & Structure | Alumex",
  description: "Company information, board of directors, corporate management, investor contacts and banking partners of Alumex PLC.",
};

export default function CorporateInformationPage() {
  return <main className={`${styles.about} ${styles.corporate}`}>
    <header className={styles.hero}>
      <Image src="/images/about/corporate-hero.webp" alt="Aluminium coils inside a modern industrial facility" fill priority quality={90} sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}>
      <p className={styles.eyebrow}><span />Corporate Information</p>
      <h1>Corporate Information</h1>
      </div>
    </header>
    <div className={styles.container}><AboutNavigation active="corporate" /></div>
    <div className={styles.corporateContainer}>
      <section className={styles.companyGrid} aria-label="Company information">
        <article className={styles.companyName}><img src="/images/about/company-logo.svg" alt="Alumex — Ultimate in Aluminium Profiles" width={400} height={110} /><h2>Name of the Company</h2><p>Alumex PLC<br /><span>A limited liability company, incorporated in Sri Lanka in 2007.</span></p></article>
        <div className={styles.companyFacts}>
          <article className={styles.companyNumber}><div className={styles.factIllustration} aria-hidden="true"><BadgeCheck size={76} strokeWidth={1.3} /></div><div><h2>Company Number</h2><p>PV 539 PQ</p></div></article>
          <article className={styles.stockListing}><div><h2>Stock Exchange Listing</h2><p>The ordinary shares of the Company were listed on the <strong>Colombo Stock Exchange of Sri Lanka on 31 March 2014.</strong></p></div><div className={styles.factIllustration} aria-hidden="true"><TrendingUp size={76} strokeWidth={1.3} /></div></article>
        </div>
      </section>
      <section className={styles.membersSection} aria-labelledby="members-title"><h2 id="members-title">Members</h2><div className={styles.memberLogos}>{memberLogos.map(logo => <div key={logo.name}><img src={logo.image} alt={logo.name} loading="lazy" width={220} height={110} /></div>)}</div></section>
      <section className={styles.companyContacts} aria-label="Corporate and investor contacts">
        <div className={styles.contactColumn}>
          <article className={`${styles.contactCard} ${styles.greenCard}`}><h2>Registered Office</h2><div className={styles.contactRow}><MapPin aria-hidden="true" /><div><h3>Location</h3><p>Pattiwila Road, Sapugaskanda, Makola, Sri Lanka</p></div></div><div className={styles.contactRow}><Phone aria-hidden="true" /><div><h3>Telephone</h3><a href="tel:+94112400332">+94 11 240 0332</a></div></div><div className={styles.contactRow}><Printer aria-hidden="true" /><div><h3>Facsimile</h3><p>+94 11 240 0415</p></div></div></article>
          <article className={styles.contactCard}><h2>Investor Relations</h2><div className={styles.contactRow}><Phone aria-hidden="true" /><div><h3>Telephone</h3><a href="tel:+94112627610">+94 11 262 7610</a></div></div><div className={styles.contactRow}><Mail aria-hidden="true" /><div><h3>E-mail</h3><a href="mailto:info@cau.hayleys.com">info@cau.hayleys.com</a></div></div></article>
        </div>
        <div className={styles.contactColumn}>
          <article className={styles.contactCard}><h2 className={styles.smallCardTitle}>Company Secretaries</h2><div className={styles.contactRow}><MapPin aria-hidden="true" /><div><h3>Location</h3><p>Hayleys Group Services (Private) Limited<br />400, Deans Road, Colombo 10, Sri Lanka</p></div></div><div className={styles.contactRow}><Phone aria-hidden="true" /><div><h3>Telephone</h3><a href="tel:+94112627650">+94 11 262 7650</a></div></div><div className={styles.contactRow}><Printer aria-hidden="true" /><div><h3>Facsimile</h3><p>+94 11 262 7655</p></div></div></article>
          <div className={styles.corporatePhoto}><Image src="/images/about/precision.jpg" alt="An Alumex manufacturing specialist at work" fill sizes="(max-width: 750px) 90vw, 42vw" quality={90} className={styles.coverImage} /><div><span>Precision in our work.</span><strong>Trust in our partnerships.</strong></div></div>
        </div>
      </section>
      <PeopleCarousel id="directors" title="Board of" accent="Directors" people={directors} />
      <PeopleCarousel id="corporate-management" title="Corporate" accent="Management" people={corporateManagement} />
      <PeopleCarousel id="management-team" title="Management" accent="Team" people={managementTeam} />
      <section className={styles.banksSection} aria-labelledby="bankers-title"><h2 id="bankers-title">Bankers</h2><div className={styles.bankLogos}>{bankLogos.map(logo => <div key={logo.name}><img src={logo.image} alt={logo.name} loading="lazy" width={200} height={100} /></div>)}</div></section>
    </div>
  </main>;
}
