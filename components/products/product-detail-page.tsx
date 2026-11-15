import Image from "next/image";
import { FileDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ProductDetail, ProductImage } from "@/types/product";
import Markdown from "react-markdown";
import { ProductHeader } from "./product-header";
import { Footer } from "@/components/home/footer";
import { Contact } from "@/components/home/contact";
import ModelViewer from "@/components/ModelViewer";
import { ProductRange } from "./product-range";

function RoomImage({ src, alt, videoSrc, className = "", priority = false }: ProductImage & { className?: string; priority?: boolean }) {
  if (!src) return <div role="img" aria-label={alt} className={`overflow-hidden rounded-xl bg-[#eef1ed] ${className}`} />;
  if (videoSrc) {
    return <div className={`relative overflow-hidden rounded-xl bg-[#f1f3ee] ${className}`}>
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={src} aria-label={alt}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>;
  }
  return <div className={`relative overflow-hidden rounded-xl bg-[#f1f3ee] ${className}`}><Image src={src} alt={alt} fill quality={90} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none" priority={priority} /></div>;
}

export function ProductDetailPage({ product }: { product: ProductDetail }) {
  const catalogueHref = product.catalogueUrl ?? `mailto:info@alumexgroup.com?subject=${encodeURIComponent(`${product.name} product catalogue request`)}&body=${encodeURIComponent(`Please send me the ${product.name} product catalogue.`)}`;
  const enquiryHref = `mailto:info@alumexgroup.com?subject=${encodeURIComponent(`${product.name} enquiry`)}`;
  return (
    <>
      <ProductHeader />
      <main className="mx-auto w-[calc(100%_-_2*var(--page-gutter))] max-w-[1440px] pb-28 pt-8 max-[700px]:pb-16 max-[700px]:pt-5">
        <section aria-labelledby="product-title">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="mb-6 flex items-center justify-center gap-2.5 text-sm font-medium text-[#51594e]"><span className="size-2.5 rounded-full bg-[#62bd46]" />Products</p>
            <h1 id="product-title" className="text-[clamp(34px,4vw,60px)] font-semibold leading-[1.15] tracking-[-.035em] text-[#202420]">{product.name} – <span className="whitespace-pre-line text-[#62bd46]">{product.headline}</span></h1>
            <p className="!mx-auto mt-6 max-w-[660px] text-center text-lg leading-relaxed text-[#858585] max-[700px]:text-base">{product.summary}</p>
          </div>

          <div className="mt-20 grid grid-cols-[.92fr_1fr_1.4fr] gap-7 max-[900px]:mt-12 max-[900px]:gap-4 max-[700px]:grid-cols-2">
            <div className="grid grid-rows-2 gap-7 max-[900px]:gap-4">
              <RoomImage {...product.gallery[0]} className="min-h-[250px] max-[900px]:min-h-[180px] max-[700px]:min-h-[150px]" priority />
              <RoomImage {...product.gallery[1]} className="min-h-[250px] max-[900px]:min-h-[180px] max-[700px]:min-h-[150px]" />
            </div>
            <div className="flex flex-col gap-6 max-[900px]:gap-4">
              <RoomImage {...product.gallery[2]} className="min-h-[340px] flex-1 max-[900px]:min-h-[230px] max-[700px]:min-h-[190px]" priority />
              <a href={catalogueHref} download={product.catalogueUrl?.toLowerCase().endsWith(".pdf") ? `${product.slug}-catalogue.pdf` : undefined} className="group relative flex min-h-[155px] flex-col justify-center rounded-xl bg-[#62bd46] p-6 text-white transition-colors hover:bg-[#4a9c34] max-[900px]:min-h-[130px] max-[900px]:p-4">
                <strong className="text-[clamp(19px,2vw,28px)] font-semibold leading-tight">Need more details?</strong>
                <span className="mt-1 max-w-[230px] pr-4 text-lg leading-snug text-white/85 max-[900px]:text-sm">{product.catalogueUrl ? "Download" : "Request"} the {product.name}<br />Product Catalogue</span>
                <FileDown aria-hidden="true" className="absolute bottom-5 right-5 size-5 transition-transform group-hover:translate-y-1" />
              </a>
            </div>
            <RoomImage {...product.gallery[3]} className="min-h-[560px] max-[900px]:min-h-[410px] max-[700px]:col-span-2 max-[700px]:min-h-0 max-[700px]:aspect-[4/3]" priority />
          </div>

          <div className="mt-16 space-y-6 text-[17px] leading-[1.65] text-[#858585] max-[700px]:mt-9 max-[700px]:text-base">
            <Markdown>{product.overview}</Markdown>
          </div>
        </section>

        <section aria-labelledby="specifications-title" className="mt-20 max-[700px]:mt-14">
          <h2 id="specifications-title" className="border-b border-[#d5d9d2] pb-7 !text-[clamp(30px,3.5vw,52px)] !font-semibold !leading-[1.15]">Key Specifications &amp; <span>Features</span></h2>
          <div className="mt-14 grid grid-cols-2 gap-x-20 gap-y-16 max-[900px]:gap-x-10 max-[700px]:mt-8 max-[700px]:grid-cols-1 max-[700px]:gap-y-9">
            {product.specifications.map((specification, index) => <div key={specification.title}>
              <h3 className="mb-6 text-lg font-semibold">{index + 1}. {specification.title}</h3>
              <div className="text-base leading-[1.8] text-[#858585] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_p]:mt-2 [&_a]:text-[#40832e] [&_a]:underline"><Markdown>{specification.content}</Markdown></div>
            </div>)}
            <RoomImage {...product.specificationsImage} className="aspect-[1.4]" />
            {product.specificationsSecondaryImage && <RoomImage {...product.specificationsSecondaryImage} className="aspect-[1.4]" />}
            {product.modelUrl && <div className="col-span-2 overflow-hidden rounded-xl border border-[#dfe5da] bg-[#eef1ed] max-[700px]:col-span-1">
              <div className="border-b border-[#dfe5da] px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#547a42]">Interactive model</p>
                <p className="mt-1 text-sm text-[#75806e]">Drag to explore the 80mm sliding system.</p>
              </div>
              <div className="h-[300px] overflow-hidden max-[700px]:h-[220px]">
                <ModelViewer url={product.modelUrl} width="100%" height="100%" environment="studio" autoRotate autoRotateSpeed={0.55} dragRotate zoom={false} fit={0.975} intro="none" />
              </div>
            </div>}
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="mt-24 max-[700px]:mt-14">
          <h2 id="benefits-title" className="border-b border-[#d5d9d2] pb-7 !text-[clamp(30px,3.5vw,52px)] !font-semibold !leading-[1.15]">Benefits &amp; <span>Applications</span></h2>
          <div className="mt-12 grid grid-cols-2 items-start gap-20 max-[900px]:gap-10 max-[700px]:mt-8 max-[700px]:grid-cols-1 max-[700px]:gap-8">
            <div className="text-base leading-[1.8] text-[#858585] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_p]:mt-2 [&_a]:text-[#40832e] [&_a]:underline"><Markdown>{product.benefits}</Markdown></div>
            <RoomImage {...product.benefitsImage} className="aspect-[.82] max-[700px]:aspect-[1.15]" />
          </div>
        </section>
        {product.relatedProducts && product.relatedProducts.length > 0 && <section aria-labelledby="related-products-title" className="mt-24 max-[700px]:mt-14">
          <h2 id="related-products-title" className="border-b border-[#d5d9d2] pb-7 !text-[clamp(30px,3.5vw,52px)] !font-semibold !leading-[1.15]">Architectural <span>Product Range</span></h2>
          <p className="mt-6 max-w-[680px] text-base leading-[1.8] text-[#858585]">Explore aluminium systems for openings, façades, interiors and architectural finishing.</p>
          <ProductRange categories={product.relatedProducts.map(item => item.name)} />
        </section>}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[#e5e9e1] pt-7 text-sm"><Link href="/products" className="inline-flex items-center gap-2 text-[#61705b] hover:text-[#40832e]"><ArrowLeft size={17} />Back to our products</Link><a href={enquiryHref} className="inline-flex items-center gap-2 font-medium text-[#40832e]">Talk to an aluminium expert<ArrowUpRight size={17} /></a></div>
      </main>
      <Contact /><Footer homeLinks />
    </>
  );
}
