"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function BlogPostViewTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    posthog.capture("blog_post_viewed", { slug, title });
  }, [slug, title]);

  return null;
}
