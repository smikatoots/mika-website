import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
      <SiteHeader variant="dark" />
      <div className="flex-1">{children}</div>
      <SiteFooter variant="dark" />
    </div>
  );
}
