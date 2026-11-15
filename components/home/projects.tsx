import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ArrowLink, Eyebrow } from "./shared";

const projects = [
  { image: "/images/projects/dimo-hero.jpg", href: "/projects/dimo-800-mercedes-benz-centre", sizes: "(max-width: 600px) 70vw, 40vw", name: "DIMO 800 Mercedes Benz Centre", alt: "Mercedes Benz Centre illuminated at dusk" },
  { image: "/images/projects/nsbm-campus.jpg", href: "/projects", sizes: "(max-width: 600px) 94vw, 53vw", name: "Residential Developments", alt: "Landscaped buildings and courtyard at NSBM Green University" },
];
export function Projects() {
  return <section id="projects" className="projects section-container py-[72px_88px] max-[600px]:py-[48px_56px] w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto">
    <Eyebrow>Portfolio</Eyebrow><h2>Our Work in <span>Action</span></h2>
    <div className="project-grid grid-cols-[repeat(3,minmax(0,1fr))] gap-8 mt-9 max-[960px]:gap-5 max-[600px]:grid-cols-[1fr_1fr] max-[600px]:gap-4 max-[600px]:mt-7 grid">
      {projects.map(project => <a className="project-image [&_img]:h-full [aspect-ratio:1.05] max-[600px]:[aspect-ratio:.86] relative overflow-hidden rounded-[12px]" href={project.href} key={project.image}>
        <Image src={project.image} alt={project.alt} fill quality={90} sizes={project.sizes} className="object-cover" />
        <div className="project-caption gap-4 p-6.5 [&_h3]:text-[19px] [&_h3]:leading-[1.5] [&_h3]:font-medium max-[960px]:pt-4 max-[960px]:pr-4 max-[960px]:pb-4 max-[960px]:pl-4 max-[960px]:[&_h3]:text-[15px] max-[600px]:pt-3 max-[600px]:pr-3 max-[600px]:pb-3 max-[600px]:pl-3 max-[600px]:gap-2 max-[600px]:[&_h3]:text-[13px] absolute top-0 right-0 bottom-0 left-0 flex items-end justify-between text-white bg-[linear-gradient(transparent_45%,#000a)]"><h3>{project.name}</h3><span className="project-arrow text-[#555] [&_svg]:w-4.5 w-11 h-11 max-[960px]:w-8 max-[960px]:h-8 max-[600px]:w-7 max-[600px]:h-7 grid [place-items:center] shrink-0 bg-[white] rounded-[50%]"><ArrowRight /></span></div>
      </a>)}
      <div className="project-more flex-col p-7.5 [&_h3]:text-[clamp(28px,3vw,42px)] [&_h3]:font-semibold [&_h3]:leading-[1.15] [&_h3_span]:text-[#9bd68b] max-[960px]:pt-5.5 max-[960px]:pr-5.5 max-[960px]:pb-5.5 max-[960px]:pl-5.5 max-[600px]:[grid-column:1/-1] max-[600px]:min-h-37.5 max-[600px]:pt-6 max-[600px]:pr-6 max-[600px]:pb-6 max-[600px]:pl-6 max-[600px]:flex-row max-[600px]:gap-4 max-[600px]:[&_h3]:text-[30px] max-[600px]:[&>div]:[align-self:flex-end] max-[600px]:[&>div]:gap-5 flex justify-between [border:1px_solid_#ccc] rounded-[12px]"><h3 className="tracking-[-.03em]">See our<br />latest <span>work</span></h3><div className="flex items-end justify-between text-[13px] text-[#888]"><a href="/projects">All Projects</a><ArrowLink href="/projects" label="View all projects" /></div></div>
    </div>
  </section>;
}
