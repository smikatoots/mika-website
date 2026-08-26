export default function DeckTemplatesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The gallery inherits the deck's own typography from `deck/layout.tsx`.
  // It previously forced Hanken here and aliased `--font-bricolage` to it,
  // which meant the showroom for the locked look was rendering in a font no
  // deck actually uses.
  return <div className="h-full">{children}</div>;
}
