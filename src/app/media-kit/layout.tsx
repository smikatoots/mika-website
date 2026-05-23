export default function MediaKitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-zinc-950">
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
