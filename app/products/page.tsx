import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductHeader } from "@/components/products/product-header";
import { Footer } from "@/components/home/footer";
import { Contact } from "@/components/home/contact";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Products | Aluminium Solutions | Alumex",
  description:
    "Explore Alumex household, industrial, dwelling, hardware, SlenderLine, architectural, trading and Lumin aluminium solutions.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  const localListingImages: Record<string, string> = {
    household: '/images/home/household.webp', industrial: '/images/home/industrial.webp',
    dwelling: '/images/home/dwelling.webp', hardware: '/images/home/hardware.webp',
    slenderline: '/images/home/residential-photo.webp', architectural: '/images/projects/commercial-1.jpg',
    trading: '/images/home/expertise3.png', lumin: '/images/home/house.jpg',
  };
  return (
    <>
      <ProductHeader />
      <main className="section-container pb-24 pt-8 max-[700px]:pb-14 max-[700px]:pt-5">
        <section aria-labelledby="products-title">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="mb-7 flex items-center justify-center gap-3 text-base text-[#444b40]">
              <span className="size-3 rounded-full bg-[#62bd46]" />
              Products
            </p>
            <h1
              id="products-title"
              className="text-[clamp(36px,4.3vw,64px)] font-semibold leading-[1.15] tracking-[-.035em] text-[#202420]"
            >
              Choose Our Products
              <br />
              <span className="text-[#62bd46]">&amp; Get the Best.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[800px] text-lg leading-relaxed text-[#858585] max-[700px]:text-base">
              Alumex prides itself in being the{" "}
              <u>most trusted aluminium brand</u> in Sri Lanka.
              <br className="max-[700px]:hidden" /> Rooted in over three decades
              of expertise and undisputed market leadership.
            </p>
          </div>
          <div className="mt-24 grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:mt-12 max-[700px]:gap-4 max-[500px]:grid-cols-1">
            {products.map((product, index) => {
              const image = product.listingImage ?? product.gallery[0];
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group relative flex aspect-[360/470] min-w-0 overflow-hidden rounded-none bg-[#172317] text-white shadow-[0_16px_40px_#1723171a] outline-offset-4 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_#17231733] focus-visible:-translate-y-1 focus-visible:shadow-[0_24px_52px_#17231733] motion-reduce:transition-none"
                  aria-label={`Explore ${product.name} aluminium solutions`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={localListingImages[product.slug] ?? image.src}
                      alt={image.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 560px) 90vw, (max-width: 1000px) 45vw, 31vw"
                      priority={index < 3}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,5,.12)_20%,rgba(4,12,5,.78)_100%)]" aria-hidden="true" />
                  <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-[var(--green)] text-[13px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <p className="absolute right-4 top-4 max-w-[70%] rounded-full border border-white/40 bg-white/15 px-3.5 py-2 text-right text-xs font-semibold leading-[1.3] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_8px_24px_rgba(0,0,0,.18)] backdrop-blur-xl">{product.headline.replace("\n", " ")}</p>
                  <div className="relative z-[1] mt-auto w-full p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="!text-[25px] !font-semibold !leading-[1.1] !tracking-[-.03em] !text-white">{product.name}</h2>
                      <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none" />
                    </div>
                    <p className="max-w-[95%] text-[13px] leading-[1.55] text-white/80">{product.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Contact />
      <Footer homeLinks />
    </>
  );
}
