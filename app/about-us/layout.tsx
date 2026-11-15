import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <><Header homeLinks />{children}<Footer homeLinks /></>;
}
