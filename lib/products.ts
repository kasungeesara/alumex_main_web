import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProductDetail, ProductImage } from "@/types/product";

const directory = path.join(process.cwd(), "content/products");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getProductSlugs(): string[] {
  return readdirSync(directory)
    .filter(file => file.endsWith(".md") && validSlug.test(file.slice(0, -3)))
    .map(file => file.slice(0, -3))
    .sort();
}

function parseProduct(slug: string): ProductDetail {
  const source = readFileSync(path.join(directory, `${slug}.md`), "utf8");
  const { data, content } = matter(source);
  const fail = (field: string): never => { throw new Error(`Product ${slug}.md: missing or invalid ${field}`); };
  const text = (value: unknown, field: string): string =>
    typeof value === "string" && value.trim() ? value.trim() : fail(field);
  const image = (value: unknown, field: string): ProductImage => {
    if (!value || typeof value !== "object") return fail(field);
    const item = value as Record<string, unknown>;
    return {
      src: text(item.src, `${field}.src`),
      alt: text(item.alt, `${field}.alt`),
      videoSrc: item.videoSrc === undefined ? undefined : text(item.videoSrc, `${field}.videoSrc`),
    };
  };
  if (!Array.isArray(data.gallery) || data.gallery.length !== 4) fail("gallery (exactly four images)");
  const relatedProducts = data.relatedProducts === undefined ? undefined : (() => {
    if (!Array.isArray(data.relatedProducts)) return fail("relatedProducts");
    return data.relatedProducts.map((value: unknown, index: number) => {
      if (!value || typeof value !== "object") return fail(`relatedProducts[${index}]`);
      const item = value as Record<string, unknown>;
      return { name: text(item.name, `relatedProducts[${index}].name`), href: text(item.href, `relatedProducts[${index}].href`) };
    });
  })();

  // Level-two headings identify layout sections; level-three headings identify specification groups.
  const sections = new Map<string, string>();
  const chunks = content.split(/^##\s+(.+?)\s*$/m);
  for (let i = 1; i < chunks.length; i += 2) {
    const heading = chunks[i].trim().toLowerCase();
    if (sections.has(heading)) fail(`duplicate section: ${heading}`);
    sections.set(heading, chunks[i + 1].trim());
  }
  const overview = text(sections.get("overview"), "## Overview");
  const benefits = text(sections.get("benefits"), "## Benefits");
  const specSource = text(sections.get("specifications"), "## Specifications");
  const specChunks = specSource.split(/^###\s+(.+?)\s*$/m);
  const specifications: ProductDetail["specifications"] = [];
  for (let i = 1; i < specChunks.length; i += 2) {
    specifications.push({ title: text(specChunks[i], "specification title"), content: text(specChunks[i + 1], `specification ${specChunks[i]}`) });
  }
  if (!specifications.length) fail("at least one ### specification heading");

  return {
    slug,
    name: text(data.name, "name"),
    headline: text(data.headline, "headline"),
    summary: text(data.summary, "summary"),
    seoDescription: data.seoDescription === undefined ? undefined : text(data.seoDescription, "seoDescription"),
    listingOrder: data.listingOrder === undefined ? undefined :
      typeof data.listingOrder === "number" && Number.isFinite(data.listingOrder) ? data.listingOrder : fail("listingOrder"),
    listingImage: data.listingImage === undefined ? undefined : image(data.listingImage, "listingImage"),
    gallery: data.gallery.map((value: unknown, index: number) => image(value, `gallery[${index}]`)) as ProductDetail["gallery"],
    overview,
    specifications,
    specificationsImage: image(data.specificationsImage, "specificationsImage"),
    specificationsSecondaryImage: data.specificationsSecondaryImage === undefined ? undefined : image(data.specificationsSecondaryImage, "specificationsSecondaryImage"),
    benefits,
    benefitsImage: image(data.benefitsImage, "benefitsImage"),
    relatedProducts,
    catalogueUrl: data.catalogueUrl === undefined ? undefined : text(data.catalogueUrl, "catalogueUrl"),
  };
}

export function getProductBySlug(slug: string): ProductDetail | undefined {
  // Reject unknown names before constructing a path; malformed content fails visibly at build time.
  if (!validSlug.test(slug) || !getProductSlugs().includes(slug)) return undefined;
  return parseProduct(slug);
}

export function getAllProducts(): ProductDetail[] {
  return getProductSlugs().map(parseProduct).sort((a, b) =>
    (a.listingOrder ?? 999) - (b.listingOrder ?? 999) || a.name.localeCompare(b.name)
  );
}
