import { ArrowRight } from "lucide-react";

export const asset = (name: string) => `/images/home/${name}.webp`;
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[#545454] mb-6 text-[14px] [&>span]:w-2.25 [&>span]:h-2.25 max-[600px]:text-[12px] max-[600px]:mb-4 max-[600px]:[&>span]:w-2 max-[600px]:[&>span]:h-2 flex items-center gap-2.5"><span className="rounded-[50%] bg-[var(--green)] shrink-0" />{children}</p>;
}
export function ArrowLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return <a href={href} aria-label={label} className={`w-12 h-12 [border:1px_solid_#c6c6c6] rounded-[50%] inline-flex items-center justify-center shrink-0 [transition:background_.2s,_color_.2s] hover:bg-[var(--green)] hover:text-white hover:border-[var(--green)] [&_svg]:w-4.75 [&_svg]:h-4.75 max-[600px]:w-10 max-[600px]:h-10 arrow-link ${className}`}><ArrowRight size={20} strokeWidth={1.3} /></a>;
}
