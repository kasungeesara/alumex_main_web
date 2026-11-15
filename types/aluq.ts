export const requirementFields = ["productType", "application", "installationArea", "finish", "dimensions", "additionalRequirements"] as const;
export type Requirements = Record<typeof requirementFields[number], string>;
export const emptyRequirements: Requirements = { productType: "", application: "", installationArea: "", finish: "", dimensions: "", additionalRequirements: "" };
export type ChatMessage = { role: "user" | "assistant"; content: string };
export type CatalogProduct = {
  slug: string;
  name: string;
  summary: string;
  image: { src: string; alt: string };
  href: string;
  specifications: { title: string; content: string }[];
};
export type Recommendation = { slug: string; reason: string };
export type SiteTopic = { id: string; title: string; keywords: string[]; href: string; answer: string };
export type AssistantReply = {
  message: string;
  quickReplies: string[];
  recommendations: Recommendation[];
  requirements: Requirements;
  links?: { title: string; href: string }[];
};
export type DisplayMessage = ChatMessage & { id: string; recommendations?: Recommendation[]; quickReplies?: string[]; links?: { title: string; href: string }[] };
export type InquiryDraft = {
  productSlugs: string[];
  requirements: Requirements;
  customer: { name: string; email: string; phone: string; location: string; message: string };
  consent: boolean;
  website: string;
};
