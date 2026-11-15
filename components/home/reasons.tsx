import { ArrowUpRight, Leaf, ShieldCheck } from "lucide-react";
import { asset, Eyebrow } from "./shared";
import { ReasonTimeline } from "./reason-timeline";
const reasons = [
  {
    title: (
      <>
        Carefully Screened and
        <br />
        Certified Supply Chain
      </>
    ),
    copy: "At Alumex, we engineer value-added aluminium products using superior quality billets made of virgin metal, which are then processed with all essential pretreatment chemical agents and certified coatings.",
  },
  {
    title: (
      <>
        State-of-the-Art
        <br />
        Manufacturing Facilities
      </>
    ),
    copy: "State-of-the-art facilities including exclusive powder-coating through to value addition",
  },
  {
    title: "Our Warranty",
    copy: "At Alumex, all powder coated and anodized aluminium profiles come with a warranty period of up to 30 years.",
  },
  {
    title: (
      <>
        QUALICOAT &amp;
        <br />
        QUALANOD Certified
      </>
    ),
    copy: (
      <>
        Alumex is committed to meeting all specifications of the Qualicoat,
        Qualicoat Sea Side and Qualanod quality certification labels, assuring
        clients of the <u>internationally accredited standard</u> of all
        aluminium products.
      </>
    ),
  },
];

export function Reasons() {
  return (
    <section
      className="reasons py-28 [&_.eyebrow]:text-[#596359] [&_.intro-copy]:w-85 [&_.intro-copy]:mt-0 [&_.intro-copy]:mr-0 [&_.intro-copy]:mb-0 [&_.intro-copy]:ml-0 [&_.intro-copy]:text-[14px] [&_.intro-copy]:leading-[1.8] max-[1000px]:[&_.intro-copy]:w-162.5 max-[600px]:py-16 relative bg-[#fff] text-[#202820] overflow-clip"
      id="reasons"
    >
      <div className="section-container w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto">
        <div className="reasons-heading [&_div]:[flex:1] items-end gap-16 max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-6 flex justify-between">
          <div>
            <Eyebrow>Reason</Eyebrow>
            <h2>
              Why Choose <span>Us?</span>
            </h2>
          </div>
          <p className="intro-copy mt-5.5 text-[16px] leading-[1.75] max-[600px]:text-[15px] max-[600px]:mt-5 max-w-full text-[#606860]">
            Alumex prides itself in being the most trusted aluminium brand in
            Sri Lanka. Rooted in over three decades of expertise and undisputed
            market leadership, our extensive experience and{" "}
            <u>high-quality products</u> will fulfil all of your needs for
            aluminium extrusions in Sri Lanka.
          </p>
        </div>
        <ReasonTimeline>
          {reasons.map((r, i) => (
            <article key={i} data-reason-item>
              <span className="reason-number text-[clamp(48px,_4.2vw,_64px)] leading-[1] text-[#40832e] tracking-[-.05em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{r.title}</h3>
              <p>{r.copy}</p>
            </article>
          ))}
        </ReasonTimeline>
        <div
          id="sustainability"
          className="sustainability-grid gap-8 mt-16 max-[600px]:gap-4 max-[600px]:mt-9 grid grid-cols-[1fr_1fr]"
        >
          <a
            className="sustainability-card [aspect-ratio:1.3] [&:hover>img]:[transform:scale(1.03)] [&>div]:pt-8 [&>div]:pr-8 [&>div]:pb-8 [&>div]:pl-8 [&_h3]:text-[19px] [&_h3]:font-medium [&_h3]:leading-[1.5] [&_svg]:w-6 max-[600px]:[aspect-ratio:.75] max-[600px]:[&>div]:flex-col max-[600px]:[&>div]:pt-4 max-[600px]:[&>div]:pr-4 max-[600px]:[&>div]:pb-4 max-[600px]:[&>div]:pl-4 max-[600px]:[&>div]:text-center max-[600px]:[&_h3]:text-[15px] max-[600px]:[&_svg]:w-5 [&_img]:h-full [&_img]:[transition:transform_.4s] [&_div]:gap-3 relative overflow-hidden rounded-[14px]"
            href="#market"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={asset("wind-photo")}
              aria-label="Wind turbines and green countryside"
              className="h-full w-full object-cover"
            >
              <source src="https://res.cloudinary.com/rtok2ici/video/upload/v1794506495/wind2.mp4" type="video/mp4" />
            </video>
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white bg-[#10261530]">
              <Leaf className="shrink-0" />
              <h3>Low Carbon Aluminium by ALUMEX</h3>
              <ArrowUpRight className="shrink-0" />
            </div>
          </a>
          <a
            className="sustainability-card [aspect-ratio:1.3] [&:hover>img]:[transform:scale(1.03)] [&>div]:pt-8 [&>div]:pr-8 [&>div]:pb-8 [&>div]:pl-8 [&_h3]:text-[19px] [&_h3]:font-medium [&_h3]:leading-[1.5] [&_svg]:w-6 max-[600px]:[aspect-ratio:.75] max-[600px]:[&>div]:flex-col max-[600px]:[&>div]:pt-4 max-[600px]:[&>div]:pr-4 max-[600px]:[&>div]:pb-4 max-[600px]:[&>div]:pl-4 max-[600px]:[&>div]:text-center max-[600px]:[&_h3]:text-[15px] max-[600px]:[&_svg]:w-5 [&_img]:h-full [&_img]:[transition:transform_.4s] [&_div]:gap-3 relative overflow-hidden rounded-[14px]"
            href="#manufacturing"
          >
            <img
              src="https://res.cloudinary.com/dl4q9knom/image/upload/v1794538501/Sunlit_Terraced_Glass_Office_Among_Trees_x7f0by.png"
              alt="Sunlit terraced glass office among trees"
              className="w-full object-cover"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white bg-[#10261530]">
              <ShieldCheck className="shrink-0" />
              <h3>
                Responsibly made.
                <br />
                Built for tomorrow.
              </h3>
              <ArrowUpRight className="shrink-0" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
