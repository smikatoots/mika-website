import { redirect } from "next/navigation";

/** Canonical URL is /my-dreams (matches nav + legacy site). */
export default function DreamsAliasPage() {
  redirect("/my-dreams");
}
