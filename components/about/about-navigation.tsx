import Link from "next/link";
import styles from "@/app/about-us/about.module.css";

export function AboutNavigation({ active }: { active: "overview" | "corporate" }) {
  return <nav className={styles.pageNavigation} aria-label="About Us pages">
    <Link href="/about-us" aria-current={active === "overview" ? "page" : undefined}>About Alumex</Link>
    <Link href="/about-us/corporate-information" aria-current={active === "corporate" ? "page" : undefined}>Corporate Information</Link>
  </nav>;
}
