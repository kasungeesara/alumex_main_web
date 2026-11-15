import type { Metadata } from "next";
import { ProductHeader } from "@/components/products/product-header";
import { Footer } from "@/components/home/footer";
import { ProjectPortfolio } from "@/components/projects/project-portfolio";

export const metadata: Metadata = {
  title: "Our Projects | Portfolio | Alumex",
  description: "Explore Alumex commercial and residential projects, from landmark workplaces and universities to contemporary homes.",
};

export default function ProjectsPage() {
  return <>
    <ProductHeader />
    <main className="section-container pb-40 pt-8 max-[700px]:pb-20 max-[700px]:pt-5">
      <section aria-labelledby="portfolio-title">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-10 flex items-center justify-center gap-3 text-lg text-[#292929] max-[700px]:mb-7"><span className="size-4 rounded-full bg-[#62bd46]" />Portfolio</p>
          <h1 id="portfolio-title" className="text-[clamp(38px,4.3vw,60px)] font-semibold leading-[1.15] tracking-[-.025em] text-[#191919]">Our Work in <span className="text-[#62bd46]">Action</span></h1>
          <p className="mx-auto mt-9 max-w-[800px] text-lg leading-relaxed text-[#777] max-[700px]:mt-6 max-[700px]:text-base">Alumex prides itself in being the <u>most trusted aluminium brand</u> in Sri Lanka.<br className="max-[700px]:hidden" /> Rooted in over three decades of expertise and undisputed market leadership.</p>
        </div>
        <ProjectPortfolio />
      </section>
    </main>
    <Footer homeLinks />
  </>;
}
