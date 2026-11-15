import { ProductHeader } from "@/components/products/product-header";

export default function ProductLoading() {
  return <>
    <ProductHeader />
    <main aria-busy="true" aria-label="Loading product details" className="mx-auto w-[calc(100%_-_2*var(--page-gutter))] max-w-[1320px] pb-28 pt-8">
      <p role="status" className="sr-only">Loading product details…</p>
      <div aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="mx-auto h-4 w-24 rounded bg-[#edf1e9]" />
        <div className="mx-auto mt-7 h-14 w-4/5 rounded-lg bg-[#edf1e9]" />
        <div className="mx-auto mt-3 h-14 w-3/5 rounded-lg bg-[#edf1e9]" />
        <div className="mx-auto mt-6 h-12 w-2/3 rounded bg-[#f3f5ef]" />
        <div className="mt-16 grid grid-cols-3 gap-5 max-[700px]:grid-cols-2">
          <div className="aspect-[.7] rounded-xl bg-[#edf1e9]" />
          <div className="aspect-[.7] rounded-xl bg-[#edf1e9]" />
          <div className="rounded-xl bg-[#edf1e9] max-[700px]:hidden" />
        </div>
      </div>
    </main>
  </>;
}
