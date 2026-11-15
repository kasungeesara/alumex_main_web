import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { Header } from "./header";
import { BrandStrip } from "./brand-strip";

export function Hero() {
  return (
    <>
      <section
        className="w-full px-2.75 pt-2 max-[700px]:px-2"
        aria-label="Alumex aluminium solutions"
      >
        <Header />
        <div className="relative isolate h-[calc(100svh-8px)] max-h-225 w-full overflow-hidden text-white [--hero-green:#63b94b] max-[700px]:max-h-none">
          <video
            className="absolute inset-0 -z-30 block h-full w-full object-cover object-center max-[700px]:object-[58%_center]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source
              src="https://res.cloudinary.com/rtok2ici/video/upload/v1794506492/hero_vid_3.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,#0005,#0001_60%,#0001)] max-[700px]:bg-[linear-gradient(90deg,#0008,#0002),linear-gradient(0deg,#0005,transparent_65%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 z-20 text-[#ffffff66]"
            aria-hidden="true"
          >
            <span className="absolute bottom-0 left-[36.56%] top-0 block w-px bg-current max-[700px]:left-[65%]" />
            <span className="absolute bottom-0 left-[82.46%] top-0 block w-px bg-current max-[700px]:hidden" />
            <span className="absolute left-0 right-0 top-[11.07%] block h-px bg-current max-[700px]:top-[clamp(86px,13svh,110px)]" />
            <span className="absolute left-0 right-0 top-[58.36%] block h-px bg-current max-[700px]:bottom-[39.5%] max-[700px]:top-auto" />
            <span className="absolute left-0 right-0 top-[75.22%] block h-px bg-current max-[700px]:bottom-[25%] max-[700px]:top-auto" />
          </div>

          <div className="absolute left-[5%] top-[19.75%] w-[33.5%] max-[1000px]:min-[701px]:top-[23%] max-[700px]:left-6 max-[700px]:top-[clamp(112px,18svh,150px)] max-[700px]:w-[calc(100%-48px)]">
            <h1 className="m-0 text-[clamp(36px,4.5vw,88px)] font-semibold leading-[1.05] tracking-[-.018em] max-[1000px]:min-[701px]:text-[4.5vw] max-[700px]:text-[clamp(34px,9vw,56px)]">
              <span className="block whitespace-nowrap">Precision in</span>
              <span className="block whitespace-nowrap">
                <DiaTextReveal
                  text={["Every Profile.", "Every Project.", "Every Detail."]}
                  textColor="#fff"
                  colors={["#ffffff", "#a7e18f", "#63b94b", "#e7f7de", "#ffffff"]}
                  repeat
                  repeatDelay={1.5}
                  fixedWidth
                />
              </span>
            </h1>
            <p className="pt-6 max-w-105 text-[clamp(13px,1.2vw,22px)] leading-[1.4] min-[1800px]:max-w-[92%] max-[1000px]:min-[701px]:mt-3 max-[1000px]:min-[701px]:text-[1.2vw] max-[700px]:max-w-85 max-[700px]:text-sm">
              High-performance aluminium extrusions for architectural,
              industrial, and residential solutions.
            </p>
          </div>

          <div className="absolute left-[82.46%] right-0 top-[27.5%] flex flex-col items-center leading-tight max-[700px]:bottom-[43%] max-[700px]:left-6 max-[700px]:right-auto max-[700px]:top-auto max-[700px]:items-start">
            <strong className="text-[clamp(20px,1.8vw,36px)] font-semibold max-[700px]:text-[24px]">
              2.5K+
            </strong>
            <span className="mt-px text-[clamp(12px,1.04vw,20px)] max-[700px]:text-[13px]">
              Professionals
            </span>
            <span
              className="mt-2.25 flex w-[clamp(64px,5.84vw,112px)] items-center justify-center max-[700px]:absolute max-[700px]:left-28 max-[700px]:top-0 max-[700px]:mt-0 max-[700px]:w-19"
              aria-hidden="true"
            >
              <Image
                className="block aspect-square w-[57%] rounded-full object-cover"
                src="https://res.cloudinary.com/dl4q9knom/image/upload/v1794365269/Focused_Engineer_in_Industrial_Workspace_ehtsfg.png"
                alt=""
                width={256}
                height={256}
                sizes="(max-width: 700px) 43px, 64px"
                quality={90}
              />
              <Image
                className="ml-[-14%] block aspect-square w-[57%] rounded-full object-cover"
                src="https://res.cloudinary.com/dl4q9knom/image/upload/v1794365269/Industrial_Workshop_Metal_Cutting_rvdiqi.png"
                alt=""
                width={256}
                height={256}
                sizes="(max-width: 700px) 43px, 64px"
                quality={90}
              />
            </span>
          </div>

          <a
            className="group absolute bottom-0 left-0 h-[24.9%] w-[36.56%] bg-(--hero-green) focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[-5px] max-[700px]:h-[25%] max-[700px]:min-h-37.5 max-[700px]:w-full"
            href="tel:+94112403333"
          >
            <Image
              className="absolute bottom-0 right-[8.7%] z-30 h-[111.6%] w-[46.53%] object-contain object-bottom max-[700px]:right-[3%] max-[700px]:h-[106%] max-[700px]:w-[min(52vw,218px)]"
              src="https://res.cloudinary.com/dl4q9knom/image/upload/v1794364493/Smiling_Man_in_Black_and_Green_Jacket_zzc5ke.png"
              alt=""
              width={252}
              height={227}
            />
            <span className="absolute left-[13.68%] top-[14%] text-[clamp(16px,1.45vw,28px)] font-medium leading-tight max-[1000px]:min-[701px]:text-[1.4vw] max-[700px]:left-6 max-[700px]:top-6 max-[700px]:text-[clamp(16px,4vw,21px)]">
              Talk to an
              <br />
              Aluminium Expert!
            </span>
            <span
              className="absolute right-[3.3%] top-[6.5%] grid aspect-square w-[clamp(42px,4.45vw,84px)] place-items-center rounded-full border-2 border-white bg-white text-(--hero-green) transition-[background,color] group-hover:border-[#40832e] group-hover:bg-[#40832e] group-hover:text-white max-[1000px]:min-[701px]:w-[4.45vw] max-[700px]:right-3.5 max-[700px]:top-3.5 max-[700px]:w-12"
              aria-hidden="true"
            >
              <ArrowRight className="h-6 w-6 stroke-[1.5] max-[700px]:h-5 max-[700px]:w-5" />
            </span>
            <span className="absolute bottom-[7%] left-[13.68%] flex items-start gap-2.25 text-[clamp(11px,1vw,19px)] leading-[1.4] max-[1000px]:min-[701px]:gap-1.25 max-[1000px]:min-[701px]:text-[1vw] max-[700px]:bottom-4.5 max-[700px]:left-6 max-[700px]:text-xs">
              <span
                className="mt-[0.35em] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-current max-[1000px]:min-[701px]:h-1.75 max-[1000px]:min-[701px]:w-1.75"
                aria-hidden="true"
              />
              <span>
                Your official source for{" "}
                <strong className="font-semibold">24/7</strong>
                <br />
                Alumex support
              </span>
            </span>
          </a>

          <a
            className="group absolute left-[82.46%] right-0 top-[58.62%] h-[16.73%] bg-[#1a1b17] focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[-5px] max-[700px]:bottom-[25%] max-[700px]:left-[65%] max-[700px]:top-auto max-[700px]:h-[14.5%]"
            href="https://alumex.waveloop.dev/vision"
          >
            <span className="absolute bottom-[10%] left-[6.5%] text-[clamp(16px,1.4vw,27px)] font-medium leading-tight max-[1000px]:min-[701px]:text-[1.4vw] max-[700px]:bottom-3 max-[700px]:left-3 max-[700px]:text-sm">
              Get Your
              <br />Space, Reimagined
            </span>
            <span
              className="absolute right-[6.5%] top-[10%] grid aspect-square w-[clamp(42px,4.45vw,84px)] place-items-center rounded-full border-2 border-current transition-[background,color] hover:bg-white hover:text-[#202418] max-[1000px]:min-[701px]:w-[4.45vw] max-[700px]:right-2.5 max-[700px]:top-2 max-[700px]:w-9"
              aria-hidden="true"
            >
              <ArrowRight className="h-6 w-6 stroke-[1.5] max-[700px]:h-5 max-[700px]:w-5" />
            </span>
          </a>

        </div>
      </section>
      <BrandStrip />
    </>
  );
}
