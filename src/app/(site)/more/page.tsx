import { redirect } from "next/navigation";

/** Legacy path; gallery lives at /projects. */
export default function MoreRedirectPage() {
  redirect("/projects");
}
