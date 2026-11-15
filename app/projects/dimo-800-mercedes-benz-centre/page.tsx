import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/home/header";
import localFont from "next/font/local";
import { Footer } from "@/components/home/footer";
import styles from "./project.module.css";

const inter = localFont({ src: [
  { path: "../../../public/fonts/inter-400.ttf", weight: "400" },
  { path: "../../../public/fonts/inter-500.ttf", weight: "500" },
  { path: "../../../public/fonts/inter-600.ttf", weight: "600" },
  { path: "../../../public/fonts/inter-700.ttf", weight: "700" },
], display: "swap" });

export const metadata: Metadata = {
  title: "DIMO 800 Mercedes Benz Centre | Projects | Alumex",
  description: "Discover the architecture, expansive glass façades and advanced engineering of the DIMO 800 Mercedes-Benz Centre of Excellence in Colombo.",
};

const details = [
  ["Project Name", "DIMO 800 Mercedes-Benz Centre of Excellence"],
  ["Client / Developer", "Diesel & Motor Engineering PLC (DIMO)"],
  ["Location", "No. 800, Sirimavo Bandaranaike Mawatha, Colombo 14, Sri Lanka"],
  ["Completion Date", "May 2014"],
];

// Original gallery photography: architectbernardgomez.com/mercedes.html (photos 17, 20 and 22)
export default function DimoProjectPage() {
  return <>
    <Header homeLinks />
    <main className={`${styles.project} ${inter.className}`}>
      <section className={styles.hero} aria-labelledby="project-title">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/projects/dimo-hero.jpg"
          aria-hidden="true"
        >
          <source src="https://res.cloudinary.com/dl4q9knom/video/upload/v1794306076/project1_lmqe6k.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <div>
            <Link href="/projects" className={styles.eyebrow}><span />Projects</Link>
            <h1 id="project-title">DIMO 800 Mercedes<br className={styles.desktopBreak} /> Benz Centre</h1>
          </div>
          <p>A Landmark of Architectural Excellence, Innovation, and Sustainable Design.</p>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.introduction} aria-label="Project overview">
          <p>The DIMO 800 Mercedes-Benz Centre of Excellence stands as a distinguished commercial landmark in Colombo, Sri Lanka. Designed to reflect the sophistication and prestige of the Mercedes-Benz brand, this facility brings together modern architectural design, advanced automotive infrastructure, and sustainable building technologies.</p>
          <p>Completed in 2014, the centre features expansive glass façades, innovative shading systems, spacious vehicle display areas, and integrated service facilities. Its contemporary design balances functionality, visual appeal, and environmental responsibility, creating a landmark destination for luxury automotive services.</p>
        </section>

        <section className={styles.architecture} aria-labelledby="architecture-title">
          <div className={styles.watermark} aria-hidden="true"><Image src="/images/home/logo-original.png" alt="" width={750} height={150} /></div>
          <h2 id="architecture-title">Where Luxury Meets<br /><span>Architectural Excellence</span></h2>
          <div className={styles.architectureGrid}>
            <div className={styles.architectureCopy}>
              <p>The architectural design of the DIMO 800 Mercedes-Benz Centre of Excellence reflects a thoughtful balance between modern aesthetics, structural functionality, and environmental sustainability. Designed by architect Bernard Gomez, the building incorporates distinctive geometric forms, expansive glass surfaces, and carefully planned interior spaces to create a sophisticated commercial environment.</p>
              <p>The facility features innovative façade cooling and shading systems, energy-efficient lighting, and extensive use of natural daylight to enhance indoor comfort while reducing energy consumption. Sustainable elements such as rainwater harvesting, greywater reuse, and an advanced building management system further strengthen its environmental performance.</p>
              <p>Beyond its architectural appearance, the centre integrates luxury vehicle showrooms, customer lounges, training facilities, a Mercedes-Benz museum, and an advanced automotive service centre. Every element contributes to a seamless experience that combines visual elegance with practical performance.</p>
            </div>
            <div className={styles.sunset}><Image src="/images/projects/dimo-hero.jpg" alt="DIMO 800 glass showroom illuminated at dusk" fill quality={90} sizes="(max-width: 800px) 90vw, 40vw" /></div>
          </div>
          <div className={styles.exterior}><Image src="/images/projects/dimo-exterior-original.jpg" alt="DIMO 800 curved glass façade and illuminated Mercedes-Benz tower at dusk" fill quality={90} sizes="(min-width: 1800px) 1600px, (max-width: 800px) 94vw, 90vw" /></div>
        </section>

        <section className={styles.details} aria-labelledby="details-title">
          <h2 id="details-title">Details</h2>
          <dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>

        <section className={styles.engineering} aria-labelledby="engineering-title">
          <h2 id="engineering-title">Architectural Excellence &amp; Advanced Engineering</h2>
          <div className={styles.gallery}>
            <div className={styles.showroom}><Image src="/images/projects/dimo-interior-original.jpg" alt="Curved glass roof, balconies and seating area inside the DIMO 800 showroom" fill quality={90} sizes="(min-width: 1800px) 730px, (max-width: 600px) 90vw, 46vw" /></div>
            <div className={styles.workshop}><Image src="/images/projects/dimo-showroom-original.jpg" alt="Mercedes-Benz vehicles beneath the structural roof and tall glass walls of the DIMO 800 showroom" fill quality={90} sizes="(min-width: 1800px) 1050px, (max-width: 600px) 90vw, 62vw" /></div>
            <div className={styles.callout}><h3>Architectural Precision :</h3><p>The building&apos;s distinctive interior geometry, natural lighting, and carefully integrated structural details create a spacious and visually striking architectural environment.</p></div>
          </div>
          <div className={styles.closing}>
            <p>The DIMO 800 Mercedes-Benz Centre of Excellence showcases a remarkable combination of modern architectural design and advanced engineering. Its distinctive curved structures, expansive glass façades, and naturally illuminated interiors create an elegant and welcoming environment. Beyond its impressive appearance, the facility features advanced automotive service areas, modern equipment, and carefully designed workspaces that support efficient operations.</p>
            <p>Every architectural detail reflects a commitment to precision, functionality, and innovation, making DIMO 800 a significant landmark in Sri Lanka&apos;s automotive industry.</p>
          </div>
        </section>
      </div>
    </main>
    <Footer homeLinks />
  </>;
}
