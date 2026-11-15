import type { Metadata } from "next";
import Image from "next/image";
import { CheckSquare, Eye, Puzzle, Heart, UserRoundCheck, Users, Shield, ChartNoAxesCombined, Handshake } from "lucide-react";
import { AboutNavigation } from "@/components/about/about-navigation";
import { CompanyTimeline } from "@/components/about/company-timeline";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Alumex | Our Story, Purpose & Values",
  description: "Discover Alumex's story, manufacturing expertise, purpose and values. Explore our journey in aluminium innovation since 1986, as part of the Hayleys Group.",
};
const principles = [
  { name: "Purpose", icon: CheckSquare, text: "Together, we elevate living through sustainable and innovative Aluminium solutions." },
  { name: "Vision", icon: Eye, text: "To be the premier Aluminium extrusion manufacturer in the South Asian Region." },
  { name: "Mission", icon: Puzzle, text: "Create customer intimacy with innovative Aluminium solutions through world-class, sustainable manufacturing practices." },
];
const values = [
  { name: "Good citizenship", icon: Heart, text: "We care for our communities, support their growth and take responsibility for our environmental impact." },
  { name: "Enduring customer value", icon: UserRoundCheck, text: "We create lasting value through thoughtful solutions and strong relationships with every customer." },
  { name: "Respect for people", icon: Users, text: "We treat people with dignity, support their development and recognise their contribution." },
  { name: "Teamwork", icon: Handshake, text: "We work across teams and with our partners to turn shared ambition into progress." },
  { name: "Integrity", icon: Shield, text: "We act ethically and transparently, building trust in everything we do." },
  { name: "Accountability", icon: ChartNoAxesCombined, text: "We take ownership of our work and deliver on the promises we make." },
];

export default function AboutPage() {
  return <main className={styles.about}>
    <section className={styles.hero} aria-labelledby="about-title">
      <Image src="/images/about/production.webp" alt="Aluminium profiles inside the Alumex manufacturing facility" fill priority quality={90} sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}><p className={styles.eyebrow}><span />About Us</p><h1 id="about-title">About Alumex</h1></div>
    </section>
    <div className={styles.container}>
      <AboutNavigation active="overview" />
      <section className={styles.introduction} aria-label="About Alumex overview">
        <p>At Alumex, we are committed to transforming ideas into innovative aluminium solutions that shape the future. Established in 1986, we have grown into one of Sri Lanka&apos;s leading fully integrated aluminium extrusion manufacturers. As a proud member of the Hayleys Group, we deliver world-class aluminium products and services across diverse industries. Our advanced manufacturing capabilities enable us to create precision-engineered solutions that combine strength, durability, and modern aesthetics.</p>
        <p>From architectural applications to industrial requirements, we offer a comprehensive range of aluminium profiles and customized solutions. Our experienced team provides dedicated support throughout every stage, from initial design to project completion. With a strong focus on innovation, quality, and customer satisfaction, we continuously strive to exceed expectations. At Alumex, we build more than aluminium products — we shape possibilities for a stronger, more sustainable future.</p>
      </section>
      <section className={styles.bigPicture} aria-labelledby="big-picture-title">
        <div><h2 id="big-picture-title">The Big <span>Picture</span></h2><p>Shaping the Future with <span>Precision, Innovation, and Excellence</span> in Aluminium.</p></div>
        <div className={styles.picturePhoto}><Image src="/images/about/overview.jpg" alt="Alumex team handling aluminium profiles in the warehouse" fill sizes="(max-width: 800px) 90vw, 45vw" quality={90} className={styles.coverImage} /></div>
      </section>
      <div className={styles.principles}>{principles.map(({ name, icon: Icon, text }, index) => <article key={name} className={styles.principleCard}><div><Icon size={48} strokeWidth={1.5} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div><h3>{name}</h3><p>{text}</p></article>)}</div>
      <section className={styles.productionSection} aria-labelledby="production-title">
        <p className={styles.eyebrow}><span />Production</p><h2 id="production-title">The Power of<br /><span>Our Production</span></h2>
        <div className={styles.productionGrid}>
          <div className={styles.prose}>
            <p>Alumex PLC, established in 1986, is a leading fully-integrated manufacturer of aluminium profiles in Sri Lanka. Offering a wide range of architectural, residential, and industrial products, Alumex brings decades of manufacturing experience to every project. As part of Hayleys PLC, we draw on a broad network of expertise and resources to support our growth and innovation.</p>
            <p>Our manufacturing capabilities connect extrusion with a comprehensive range of finishes and value-added services. From precision profiles to architectural systems, our teams work together to meet the needs of local and international customers.</p>
            <p>Quality is part of every stage of our work. Our commitment to responsible manufacturing, technical expertise and continuous improvement helps us deliver aluminium solutions built for lasting performance.</p>
            <p>Explore our <a href="/products">product range</a> or <a href="/contact-us">speak to our team</a> about the right solution for your next project.</p>
          </div>
          <div className={styles.productionPhoto}><Image src="/images/about/precision.jpg" alt="An Alumex manufacturing specialist working on aluminium profiles" fill quality={90} sizes="(max-width: 800px) 90vw, 46vw" className={styles.coverImage} /></div>
        </div>
      </section>
      <CompanyTimeline />
      <section className={styles.valuesSection} aria-labelledby="values-title">
        <p className={styles.eyebrow}><span />Our values</p>
        <div className={styles.valuesHeading}><h2 id="values-title">Our Secret to <span>Success</span></h2><p>Our people, our principles and a shared commitment to doing better guide every decision we make.</p></div>
        <div className={styles.valuesGrid}>{values.map(({ name, icon: Icon, text }) => <article key={name}><h3><Icon size={26} strokeWidth={1.8} aria-hidden="true" />{name}</h3><p>{text}</p></article>)}</div>
      </section>
    </div>
  </main>;
}
