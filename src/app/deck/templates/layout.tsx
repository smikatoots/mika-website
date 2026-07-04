export default function DeckTemplatesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="h-full"
      style={{
        fontFamily:
          'var(--font-hanken), "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
        // Slide SVGs reference --font-bricolage; alias it here for the gallery.
        ["--font-bricolage" as string]: "var(--font-hanken)",
      }}
    >
      {children}
    </div>
  );
}
