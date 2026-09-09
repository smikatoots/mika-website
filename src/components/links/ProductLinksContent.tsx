"use client";

import { useEffect, useMemo, useState } from "react";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";
import {
  categoryLabel,
  productLinkCategories,
  productLinks,
  type ProductLink,
} from "@/lib/product-links";

type FilterId = (typeof productLinkCategories)[number]["id"];

const filterPillActive =
  "rounded-full border px-3 py-1.5 text-sm font-semibold transition-[background,border-color,color,transform] duration-300" +
  " border-[var(--mr-coral)] bg-[var(--mr-surface-rose-2)] text-[var(--mr-coral)] scale-[1.02]";

const filterPillIdle =
  "rounded-full border px-3 py-1.5 text-sm font-semibold transition-[background,border-color,color,transform] duration-300" +
  " border-[var(--mr-border)] text-[var(--mr-muted)] hover:border-[var(--mr-coral)] hover:text-[var(--mr-coral)] hover:scale-[1.02]";

function trackLinkClick(link: ProductLink) {
  posthog.capture("referral_link_clicked", {
    href: link.href,
    label: link.name,
    link_type: "product",
    category: link.categories.join(","),
  });
  trackGa4Event("affiliate_product_click", {
    cta_label: link.name,
    cta_location: "product_links_page",
    destination_url: link.href,
    link_type: "affiliate_product",
  });
}

/* Card grounds, cycled so no two neighbours in the grid repeat. Every one
   clears AA with black type, which is what the cards set — an accent is never
   text here, so nothing on a card is coloured.

   These key off position rather than off the link, so the grid always reads as
   a full spread; filtering reshuffles the colours, which lands with the enter
   animation the grid already plays. */
const LINK_CARD_GROUNDS = [
  "var(--mr-sun-yellow)",
  "var(--mr-teal)",
  "var(--mr-coral-soft)",
  "var(--mr-lime)",
  "var(--mr-periwinkle)",
  "var(--mr-sand)",
] as const;

function ProductLinkCard({
  link,
  visibleIndex,
  reduceMotion,
}: {
  link: ProductLink;
  visibleIndex: number;
  reduceMotion: boolean;
}) {
  const showDelay = reduceMotion ? "0ms" : `${visibleIndex * 45}ms`;
  const ground = LINK_CARD_GROUNDS[visibleIndex % LINK_CARD_GROUNDS.length];

  return (
    <div
      className="min-h-0"
      style={{
        opacity: 1,
        transform: "translateY(0) scale(1)",
        animation: reduceMotion
          ? undefined
          : "product-link-enter 0.45s var(--mr-ease) both",
        animationDelay: showDelay,
        viewTransitionName: reduceMotion ? undefined : `product-link-${link.id}`,
      }}
    >
      <a
        href={link.href}
        className="mr-lift group flex h-full flex-col"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => trackLinkClick(link)}
        style={{
          // Colour is the container — no border, no shadow.
          background: ground,
          borderRadius: "var(--mr-radius-card)",
          padding: "20px 22px",
          textDecoration: "none",
          minHeight: "148px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--mr-font-display)",
            fontSize: "var(--mr-text-h3)",
            fontWeight: "var(--mr-weight-display)",
            letterSpacing: "-0.01em",
            color: "var(--mr-ink)",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}
        >
          {link.name}
        </h3>
        <p
          style={{
            flex: 1,
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-sm)",
            lineHeight: 1.55,
            color: "var(--mr-ink)",
            margin: 0,
          }}
        >
          {link.description}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {link.categories.map((category) => (
            <span
              key={category}
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                fontWeight: "var(--mr-weight-semi)",
                color: "var(--mr-ink)",
                background: "var(--mr-paper)",
                borderRadius: "var(--mr-radius-chip)",
                padding: "4px 10px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {categoryLabel(category)}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}

export function ProductLinksContent() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const visibleLinks = useMemo(() => {
    if (activeFilter === "all") return productLinks;
    return productLinks.filter((link) => link.categories.includes(activeFilter));
  }, [activeFilter]);

  function handleFilterChange(next: FilterId) {
    if (next === activeFilter) return;

    const apply = () => setActiveFilter(next);

    if (reduceMotion || typeof document === "undefined" || !("startViewTransition" in document)) {
      apply();
      return;
    }

    document.startViewTransition(apply);
  }

  return (
    <div className="space-y-8">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Filter links by category"
      >
        {productLinkCategories.map((category) => {
          const isActive = activeFilter === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? filterPillActive : filterPillIdle}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        className="product-links-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ viewTransitionName: reduceMotion ? undefined : "product-links-grid" }}
      >
        {visibleLinks.map((link, index) => (
          <ProductLinkCard
            key={link.id}
            link={link}
            visibleIndex={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
