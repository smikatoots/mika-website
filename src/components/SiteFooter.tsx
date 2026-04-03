import { SITE_NAME } from "@/lib/site";

export function SiteFooter({ variant = "dark" }: { variant?: "light" | "dark" }) {
  if (variant === "light") {
    return (
      <footer className="border-t border-zinc-200 bg-white py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {SITE_NAME}
      </footer>
    );
  }
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-10 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} {SITE_NAME}
    </footer>
  );
}
