import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { slidingProducts } from "@/data/sliding-products";
import { ProductDetailPage } from "@/components/products/product-detail-page";
import type { ProductDetail } from "@/types/product";
import { ProductHeader } from "@/components/products/product-header";
import { Footer } from "@/components/home/footer";

type Props = { params: Promise<{ system: string }> };

const eightyMillimetreProduct: ProductDetail = {
  slug: "80mm-sliding-systems",
  name: "80mm Sliding Systems",
  headline: "Flexible Sliding Doors\nfor Wider Openings",
  summary: "Aluminium sliding doors and windows for residential and commercial applications, with flexible panel configurations and durable everyday performance.",
  seoDescription: "Explore Alumex 80mm sliding doors and windows with double, triple and four-panel configurations for residential and commercial projects.",
  gallery: [
    { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1785998513/alumex/user-upload/generated/door-window-sess-q8lq471-1785998419665-1785998512449.jpg", alt: "Alumex 80mm sliding doors and windows" },
    { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1793088497/alumex/user-upload/raw/qd9lrkbap4cvahoanduq.jpg", alt: "Aluminium sliding system detail" },
    { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794538376/Main_ulmwqx.png", alt: "80mm sliding door and window system" },
    { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794538376/Main_ulmwqx.png", alt: "Wide 80mm aluminium sliding opening", videoSrc: "https://res.cloudinary.com/dl4q9knom/video/upload/v1793841675/hf_20261105_011701_f17e37e0-0523-46ea-b6a3-56c217558320_ekwa8k.mp4" },
  ],
  overview: "Alumex 80mm sliding doors and windows are available in a wide range of configurations to suit any design application, offering double the entry width of normal doors. Quality design and construction adds strength, excellent security and durability for years of effortless use. The design can be used for residential or commercial applications and is durable and cost effective for the user. Double, triple or four-panel options provide greater flexibility.",
  specifications: [
    { title: "Frame & Durability", content: "- 80mm frame for added strength and durability\n- Quality aluminium construction for long-term everyday use" },
    { title: "Security", content: "- Standard locking mechanism for greater security\n- Flexible locking options to suit the application" },
    { title: "Weather Protection", content: "- Full joint sealing maximises weather-proofing performance\n- Coordinated frame, seal and glazing details support a reliable installation" },
    { title: "Configuration", content: "- Single glazed capability\n- Double, triple or four-panel options\n- Fly screen options available" },
  ],
  specificationsImage: { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794538358/Modern_Cream_Window_Amidst_Lush_Greenery_keqj7a.png", alt: "Modern aluminium window amid lush greenery" },
  specificationsSecondaryImage: { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794538348/Modern_Window_with_Garden_Bedroom_View_qoapqp.png", alt: "Modern window with a garden bedroom view" },
  modelUrl: "https://res.cloudinary.com/rtok2ici/image/upload/v1793778781/Main3.glb",
  benefits: "- Create wider openings and stronger connections between interior and exterior spaces.\n- Choose panel configurations to suit residential or commercial layouts.\n- Balance durability, security and practical cost for everyday use.\n- Coordinate glazing, locking and fly-screen options around the project requirements.\n- Use a flexible sliding solution for a wide range of design applications.",
  benefitsImage: { src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794538358/Modern_Apartment_Window_in_Warm_Daylight_zoekys.png", alt: "Modern apartment window in warm daylight" },
  catalogueUrl: "https://alumex.waveloop.dev/products/80mm-sliding-window",
};

export function generateStaticParams() {
  return slidingProducts.map(product => ({ system: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { system } = await params;
  const product = slidingProducts.find(item => item.slug === system);
  if (!product) notFound();
  return { title: `${product.name} | Architectural | Alumex`, description: product.slug === eightyMillimetreProduct.slug ? eightyMillimetreProduct.seoDescription : product.description };
}

async function SlidingProductContent({ params }: Props) {
  const { system } = await params;
  const product = slidingProducts.find(item => item.slug === system);
  if (!product) notFound();
  if (product.slug === eightyMillimetreProduct.slug) return <ProductDetailPage product={eightyMillimetreProduct} />;
  return <>
    <ProductHeader />
    <main className="section-container py-12 max-[700px]:py-8">
      <Link href="/products/architectural#related-products-title" className="inline-flex items-center gap-2 text-sm text-[#547a42]"><ArrowLeft size={16} aria-hidden="true" />Back to Architectural products</Link>
      <section className="my-10 rounded-3xl border border-[#dce5d6] bg-[#f3f7ee] p-12 max-[700px]:p-6">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#547a42]">Architectural / Slidings</p>
        <h1 className="mt-6 max-w-4xl text-[clamp(32px,4vw,60px)] font-semibold leading-[1.1] tracking-[-.035em] text-[#263e27]">{product.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#75806e]">{product.description}</p>
        <div className="mt-10 border-t border-[#dce5d6] pt-8">
          <h2 className="!text-2xl !font-medium">Find the right configuration</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#75806e]">Share your opening dimensions, intended application and glazing requirements with our team to discuss available configurations, finishes and technical details.</p>
          <Link href="/contact-us" className="mt-6 inline-flex items-center gap-4 rounded-full bg-[#263e27] px-6 py-3 text-sm font-medium text-white hover:bg-[#40832e]">Enquire about this product<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <section aria-labelledby="other-systems-title" className="mb-14">
        <h2 id="other-systems-title" className="!text-2xl !font-medium">Explore other systems</h2>
        <div className="mt-6 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {slidingProducts.filter(item => item.slug !== system).map(item => <Link key={item.slug} href={`/products/architectural/slidings/${item.slug}`} className="flex items-center justify-between gap-4 rounded-xl border border-[#dce5d6] p-5 text-sm font-medium text-[#263e27] hover:bg-[#f3f7ee]">{item.name}<ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></Link>)}
        </div>
      </section>
    </main>
    <Footer homeLinks />
  </>;
}

export default function SlidingProductPage({ params }: Props) {
  return <Suspense fallback={<main className="section-container py-24 text-center text-[#75806e]">Loading product…</main>}><SlidingProductContent params={params} /></Suspense>;
}
