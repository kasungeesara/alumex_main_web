export type ProductImage = { src: string; alt: string; videoSrc?: string; placeholder?: boolean };

export type ProductDetail = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  seoDescription?: string;
  listingOrder?: number;
  listingImage?: ProductImage;
  gallery: [ProductImage, ProductImage, ProductImage, ProductImage];
  overview: string;
  specifications: { title: string; content: string }[];
  specificationsImage: ProductImage;
  specificationsSecondaryImage?: ProductImage;
  modelUrl?: string;
  benefits: string;
  benefitsImage: ProductImage;
  relatedProducts?: { name: string; href: string }[];
  catalogueUrl?: string;
};
