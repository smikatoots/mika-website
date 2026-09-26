import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SubscribeModal } from "@/components/SubscribeModal";

/* This carries the same ground the (site) layout sets, so /about and /blog do
   not sit on different colours. The home page opts out by wrapping itself in
   `.mr-root`, which paints the warm linen. */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--mr-paper)" }}>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <SubscribeModal />
    </div>
  );
}
