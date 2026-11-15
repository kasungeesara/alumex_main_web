import { Suspense } from "react";
import ProductLoading from "./loading";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/products/product-detail-page";
import { getProductBySlug, getProductSlugs } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return {
    title: `${product.name} | ${product.headline.replace(/\n/g, " ")} | Alumex`,
    description: product.seoDescription ?? product.summary,
  };
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
