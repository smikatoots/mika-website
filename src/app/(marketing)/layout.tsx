import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-900">
      <SiteHeader variant="light" />
      <div className="flex-1">{children}</div>
      <SiteFooter variant="light" />
    </div>
  );
}
