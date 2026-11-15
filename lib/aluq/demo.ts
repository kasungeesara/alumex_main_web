import { emptyRequirements, type AssistantReply, type CatalogProduct, type ChatMessage, type InquiryDraft, type Requirements, type SiteTopic } from "../../types/aluq";

// Intentionally a local guided demo, not an AI service. All cards resolve to catalogue data.
const matches: Record<string, RegExp> = {
  dwelling: /window|door|frame|sliding|bedroom|kitchen|bathroom|living room|balcony|renovat/i,
  household: /household|home|house|residential|furniture|everyday/i,
  industrial: /industrial|factory|machine|enclosure|framework|fabricat|drawing/i,
  hardware: /hardware|hinge|handle|accessor|lock|fitting/i,
  architectural: /architect|building|facade|façade|commercial|construction/i,
  slenderline: /slender|slim|minimal|sightline/i,
  lumin: /lumin/i,
  trading: /trading|bulk|supply|business|export/i,
};
const productTypes: [RegExp, string][] = [[/sliding\s*(?:aluminium\s*)?window/i, "Sliding window"], [/sliding\s*door/i, "Sliding door"], [/window/i, "Window"], [/door/i, "Door"], [/hardware|hinge|handle|accessor|lock/i, "Hardware"], [/profile|extrusion/i, "Aluminium profiles"]];
const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Office", "Factory"];
const finishes = ["Black", "White", "Bronze", "Wood Finish", "Anodized", "Powder coated", "Mill finish"];

export function matchProducts(query: string, products: CatalogProduct[]) {
  return products.map(product => ({ product, score: (query.toLowerCase().includes(product.name.toLowerCase()) ? 5 : 0) + (matches[product.slug]?.test(query) ? 3 : 0) }))
    .filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.product);
}

export function findWebsiteTopic(input: string, topics: SiteTopic[]): SiteTopic | undefined {
  const query = input.toLowerCase().replace(/[’']/g, "");
  return topics.map(topic => ({ topic, score: topic.keywords.reduce((score, keyword) => {
    const escaped = keyword.toLowerCase().replace(/[’']/g, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|\\W)${escaped}(?:$|\\W)`, "i").test(query) ? score + keyword.length : score;
  }, 0) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score)[0]?.topic;
}

export function demoReply(messages: ChatMessage[], current: Requirements, catalog: CatalogProduct[], topics: SiteTopic[] = []): AssistantReply {
  const input = messages.at(-1)?.content.trim() ?? "";
  const previous = messages.at(-2)?.content ?? "";
  const requirements = { ...current };
  if (/^(reset|start over|new search)$/i.test(input)) return { message: "What are you looking for? Tell me about a product or project, or browse the catalogue.", quickReplies: ["Sliding window for my house", "Industrial profiles", "Compare products"], recommendations: [], requirements: { ...emptyRequirements } };
  const topic = findWebsiteTopic(input, topics);
  const preferenceAnswer = /^(skip|not sure|black|white|bronze|wood finish|anodized|powder coated|mill finish)$/i.test(input) || /change.*finish|add.*dimension/i.test(input);
  if (topic && !preferenceAnswer && !/^(i need|i want|looking for|we need)/i.test(input)) return {
    message: topic.answer,
    links: [{ title: topic.title, href: topic.href }],
    requirements,
    recommendations: [],
    quickReplies: ["Company details", "Available finishes", "Export markets", "Contact details", "Browse catalogue"],
  };
  for (const [pattern, label] of productTypes) if (pattern.test(input)) { requirements.productType = label; break; }
  const room = rooms.find(value => input.toLowerCase().includes(value.toLowerCase()));
  if (room) requirements.installationArea = room;
  if (/residen|house|home|apartment/i.test(input)) requirements.application = "Residential";
  if (/industrial|factory|machine/i.test(input)) requirements.application = "Industrial";
  if (/commercial|office|shop|hotel/i.test(input)) requirements.application = "Commercial";
  const finish = finishes.find(value => input.toLowerCase().includes(value.toLowerCase()));
  if (finish) requirements.finish = finish;
  if (/wood/i.test(input)) requirements.finish = "Wood Finish";
  if (/not sure|no preference|skip/i.test(input)) {
    if (/finish/i.test(previous)) requirements.finish = "Not specified";
    else if (/room|install|area/i.test(previous)) requirements.installationArea = "Not specified";
    else if (/dimension|size/i.test(previous)) requirements.dimensions = "Not specified";
  }
  const dimension = input.match(/\b\d+(?:\.\d+)?\s*(?:mm|cm|m|ft|feet|inches)?\s*[x×*]\s*\d+(?:\.\d+)?\s*(?:mm|cm|m|ft|feet|inches)?\b/i);
  if (dimension) requirements.dimensions = dimension[0];
  if (/other/i.test(input) && /room|install|area/i.test(previous)) requirements.installationArea = "Other — please describe in your inquiry";
  if (!requirements.productType) {
    const named = catalog.find(product => input.toLowerCase().includes(product.name.toLowerCase()));
    if (named) requirements.productType = named.name;
  }
  const explicitResults = /recommend|show|browse|compare|options|product details/i.test(input);
  const query = `${requirements.productType} ${requirements.application} ${requirements.installationArea} ${input}`;
  const products = matchProducts(query, catalog);
  const base = { requirements, recommendations: [] as AssistantReply["recommendations"] };
  if (/change.*finish/i.test(input) && !finish) return { ...base, message: "Which finish would you prefer instead?", quickReplies: ["Black", "White", "Bronze", "Wood Finish", "Not sure", "Skip"] };
  if (/add.*dimension/i.test(input)) return { ...base, message: "What dimensions do you have in mind? Include units, for example 1200 x 1500 mm. You can also skip this.", quickReplies: ["Skip"] };
  if (/compare/i.test(input) && products.length < 2) return { ...base, message: "Which ranges would you like to compare? You can name two products or open the catalogue to see their actual specifications.", quickReplies: ["Compare Dwelling and SlenderLine", "Compare Industrial and Hardware", "Browse catalogue"] };
  if (!requirements.productType && !explicitResults && products.length === 0) return { ...base, message: "Tell me what you plan to build or the type of aluminium product you need. This guided demo uses the website’s existing product ranges; it cannot confirm prices or technical performance.", quickReplies: ["Sliding window for my house", "Industrial profiles", "Hardware accessories", "Browse catalogue"] };
  if (!explicitResults && /window|door/i.test(requirements.productType) && !requirements.installationArea) return { ...base, message: "Where are you planning to install it? You can choose an area, type your own answer, or skip this question.", quickReplies: ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Other", "Skip"] };
  if (!explicitResults && /window|door|frame/i.test(requirements.productType) && !requirements.finish) return { ...base, message: "Do you have a preferred frame finish? These are your preferences; the Alumex team would need to confirm availability.", quickReplies: ["Black", "White", "Bronze", "Wood Finish", "Not sure", "Skip"] };
  if (!products.length) return { ...base, message: "I couldn’t match that requirement to an existing range in this demo. Browse the catalogue to choose an alternative, or add a suitable range to an inquiry and explain what you need.", quickReplies: ["Browse catalogue", "Start over"] };
  const comparing = /compare/i.test(input);
  return {
    requirements,
    message: comparing ? "Here are the matching ranges with their published specifications so you can compare. The catalogue does not provide prices or verified performance ratings for every configuration." : "These existing Alumex ranges are worth discussing for your project. They are ranges, not a confirmed individual system; exact dimensions, finishes and suitability need the Alumex team’s review. Add a range to your inquiry to continue.",
    quickReplies: ["Change my finish", "Add dimensions", "Browse catalogue", "Start over"],
    recommendations: products.map(product => ({ slug: product.slug, reason: comparing ? `Compare ${product.name} using its actual catalogue description and specifications below.` : `${product.name} is a related range for ${requirements.productType || "your project"}. ${product.summary}` })),
  };
}

export function validateDemoInquiry(draft: InquiryDraft, products: CatalogProduct[]): string | null {
  if (!draft.productSlugs.length || draft.productSlugs.length > 4 || draft.productSlugs.some(slug => !products.some(product => product.slug === slug))) return "Please select one to four existing product ranges.";
  if (!draft.customer.name.trim()) return "Please enter a customer name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.customer.email.trim())) return "Please enter a valid email address.";
  if (!/^[+\d\s().-]+$/.test(draft.customer.phone) || draft.customer.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
  if (!draft.customer.location.trim()) return "Please enter a project location.";
  if (!draft.consent) return "Please confirm you understand this is a demo.";
  return null;
}
