import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SubscribeModal } from "@/components/SubscribeModal";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--mr-surface-warm)" }}>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <SubscribeModal />
    </div>
  );
}
