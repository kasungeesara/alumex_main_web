import "server-only";
import { getAllProducts } from "../products";
import type { CatalogProduct } from "../../types/aluq";
import type { SiteTopic } from "../../types/aluq";
import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export function getAluqWebsiteKnowledge(): SiteTopic[] {
  const { data } = matter(readFileSync(path.join(process.cwd(), "content/aluq/website-knowledge.md"), "utf8"));
  if (!Array.isArray(data.topics)) throw new Error("ALUQ website knowledge requires topics.");
  return data.topics.map((value: unknown) => {
    const item = value as SiteTopic;
    if (!item || ![item.id, item.title, item.answer, item.href].every(field => typeof field === "string" && field.trim()) || !/^\/(?!\/)/.test(item.href) || !Array.isArray(item.keywords) || !item.keywords.every(keyword => typeof keyword === "string" && keyword.trim())) throw new Error("Invalid ALUQ website knowledge topic.");
    return { id: item.id, title: item.title, answer: item.answer, href: item.href, keywords: item.keywords };
  });
}

export function getAluqCatalog(): CatalogProduct[] {
  return getAllProducts().map(product => ({
    slug: product.slug,
    name: product.name,
    summary: product.summary,
    image: product.listingImage ?? product.gallery[0],
    href: `/products/${product.slug}`,
    specifications: product.specifications,
  }));
}

