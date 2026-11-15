import type { InquiryDraft, Requirements } from "../../types/aluq";

export type InquiryStep = {
  id: string;
  scope: "customer" | "requirements" | "consent";
  field: string;
  question: string;
  optional?: boolean;
  options?: string[];
  max: number;
};
const steps: InquiryStep[] = [
  { id: "name", scope: "customer", field: "name", question: "Let’s prepare your inquiry. What is your name? Use sample details for this preview.", max: 100 },
  { id: "email", scope: "customer", field: "email", question: "What email address should be included in your inquiry?", max: 254 },
  { id: "phone", scope: "customer", field: "phone", question: "What is your phone number, including the country code?", max: 40 },
  { id: "location", scope: "customer", field: "location", question: "Where is your project located? Tell me the city or area.", max: 200 },
  { id: "productType", scope: "requirements", field: "productType", question: "What type of product do you need, such as a window, door or aluminium profile?", max: 200 },
  { id: "application", scope: "requirements", field: "application", question: "What is the intended application?", optional: true, options: ["Residential", "Commercial", "Industrial", "Skip"], max: 200 },
  { id: "installationArea", scope: "requirements", field: "installationArea", question: "Where will it be installed or used?", optional: true, max: 200 },
  { id: "finish", scope: "requirements", field: "finish", question: "Do you have a preferred finish? Availability would need confirmation from Alumex.", optional: true, options: ["Black", "White", "Bronze", "Wood Finish", "Skip"], max: 200 },
  { id: "dimensions", scope: "requirements", field: "dimensions", question: "Do you know the dimensions? Include units, for example 1200 x 1500 mm, or skip if undecided.", optional: true, max: 200 },
  { id: "additionalRequirements", scope: "requirements", field: "additionalRequirements", question: "Any additional requirements, such as quantities, drawings or installation needs?", optional: true, max: 1500 },
  { id: "message", scope: "customer", field: "message", question: "Would you like to add a message for the Alumex team? You can skip this.", optional: true, max: 2000 },
  { id: "consent", scope: "consent", field: "consent", question: "Your details are ready. Please confirm you understand this is a preview and the inquiry will not be sent. Then you can review and edit everything before submitting the preview.", options: ["Yes, continue", "Cancel"], max: 100 },
];

export function nextInquiryStep(requirements: Requirements, customer: InquiryDraft["customer"], consent: boolean, skipped: ReadonlySet<string>): InquiryStep | undefined {
  return steps.find(step => {
    if (skipped.has(step.id)) return false;
    if (step.scope === "consent") return !consent;
    const data = step.scope === "customer" ? customer : requirements;
    return !(data as Record<string, string>)[step.field]?.trim();
  });
}

export function validateInquiryAnswer(step: InquiryStep, input: string): string | null {
  const value = input.trim();
  if (step.optional && /^(skip|not sure|no|none)$/i.test(value)) return null;
  if (!step.optional && /^(skip|not sure|no|none)$/i.test(value)) return `Your ${step.id} is required. Please provide it or choose Cancel.`;
  if (!value || value.length > step.max) return `Please enter ${step.id} using no more than ${step.max} characters.`;
  if (step.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "That email address doesn’t look right. Please enter a valid email, such as name@example.com.";
  if (step.id === "phone" && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, "").length < 7)) return "Please enter a valid phone number with at least seven digits.";
  if (step.scope === "consent" && !/^(yes|yes, continue|i understand|confirm|agree)$/i.test(value)) return "Please choose Yes, continue to review your preview inquiry, or Cancel to return to the conversation.";
  return null;
}
