import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "./products-data";

export function ProductCard({ product, index }: { product: typeof products[number]; index: number }) {
  return <Link href={product.href ?? "#contact"} className="expertise-card group relative flex min-w-0 max-w-full overflow-hidden rounded-[24px] text-white" style={{ "--card-index": index } as CSSProperties} aria-label={product.href ? `Explore ${product.name} aluminium solutions` : `Enquire about ${product.name} aluminium solutions`}>
    <div className="expertise-card-image absolute inset-0 overflow-hidden">
      <img src={product.image} alt={`${product.name} aluminium solutions`} width={480} height={600} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,5,.12)_20%,rgba(4,12,5,.78)_100%)]" aria-hidden="true" />
    <span className="expertise-number absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[var(--green)] text-[14px] font-bold text-white">0{index + 1}</span>
    <p className="expertise-category absolute right-5 top-5 max-w-[70%] rounded-full border border-white/40 bg-white/15 px-4.5 py-2.5 text-right text-[14px] font-semibold leading-[1.3] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_8px_24px_rgba(0,0,0,.18)] backdrop-blur-xl">{product.category}</p>
    <div className="expertise-card-copy relative z-[1] mt-auto w-full p-7">
      <div className="expertise-card-title mb-3 flex items-center justify-between gap-3">
        <h3 className="text-[30px] font-semibold leading-[1.1] tracking-[-.03em] text-white">{product.name}</h3>
        <ArrowUpRight aria-hidden="true" className="h-7 w-7 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <p className="expertise-description max-w-[90%] text-[15px] leading-[1.6] text-white/80">{product.description}</p>
    </div>
  </Link>;
}

export function ProductMoreCard({ index }: { index: number }) {
  return <Link
    href="/products"
    aria-label="See more products"
    className="expertise-card group relative flex min-w-0 max-w-full overflow-hidden rounded-[24px] text-white"
    style={{ "--card-index": index, background: "linear-gradient(145deg, #345b36 0%, #172f1d 60%, #102017 100%)" } as CSSProperties}
  >
    <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-24 size-80 rotate-[25deg] rounded-[36px] border border-[#92cc7960]">
      <div className="absolute inset-6 rounded-[26px] border border-[#92cc7940]" />
      <div className="absolute inset-12 rounded-[18px] border border-[#92cc792b]" />
    </div>
    <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90">The complete collection</span>
    <div className="expertise-card-copy relative z-[1] mt-auto flex w-full flex-col p-7">
      <span className="mb-5 text-sm font-medium uppercase tracking-[.12em] text-[#a4d890]">Discover more</span>
      <h3 className="max-w-80 text-[46px] font-semibold leading-[1.08] tracking-[-.035em] text-white">See more<br />products</h3>
      <div className="mb-8 mt-5"><p className="max-w-72 text-[15px] leading-[1.6] text-white/75">Find the right aluminium solution for your next project.</p></div>
      <span className="flex items-center justify-between gap-4 border-t border-white/20 pt-5 text-base font-medium text-white">
        View all products
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#62bd46] text-white transition-colors group-hover:bg-white group-hover:text-[#315b29]"><ArrowUpRight size={24} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" /></span>
      </span>
    </div>
  </Link>;
}
