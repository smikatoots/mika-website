import { SITE_NAME } from "@/lib/site";
import { textMuted } from "@/lib/ui/site-styles";

export function SiteFooter() {
  return (
    <footer
      className={`border-t border-zinc-200 bg-white py-10 text-center ${textMuted}`}
    >
      © {new Date().getFullYear()} {SITE_NAME}
    </footer>
  );
}
