const paths: Record<string, React.ReactNode> = {
 tiktok: <path d="M14 3h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.5V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3Z"/>,
 facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v8"/>,
 instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5"/></>,
 linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></>,
 youtube: <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3Z"/></>,
};
export function SocialIcon({name, className}:{name:string; className?: string}) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>; }
