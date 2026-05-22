export default function MediaKitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-zinc-950">
      {children}
    </div>
  );
}
